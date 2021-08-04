import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../../components/Translations';
import ScorecardListItem from '../../components/ScorecardList/ScorecardListItem';
import MessageModal from '../../components/MessageModal';
import NoDataMessage from '../../components/NoDataMessage';
import ListSectionTitle from '../../components/ListSectionTitle';

import uuidv4 from '../../utils/uuidv4';
import Scorecard from '../../models/Scorecard';
import ScorecardService from '../../services/scorecardService';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

import { getDeviceStyle } from '../../utils/responsive_util';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';
import { SELECTED_FILTERS } from '../../constants/main_constant';
import scorecardFilterService from '../../services/scorecard_filter_service';
import scorecardHelper from '../../helpers/scorecard_helper';
import { getListStickyIndices } from '../../utils/scorecard_util';

class ScorecardList extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      selectedScorecard: null,
      scorecards: Scorecard.getAll(),
      isLoading: false,
    }
  }

  componentDidMount() {
    this.updateMilestone();
    this.focusListener = this.props.navigation.addListener("focus", async () => {
      this.setState({ isLoading: true });

      let selectedFilters = await AsyncStorage.getItem(SELECTED_FILTERS);
      selectedFilters = JSON.parse(selectedFilters);
      const scorecards = selectedFilters ? await scorecardFilterService.getFilteredScorecards(selectedFilters) : Scorecard.getAll();

      this.setState({
        scorecards: scorecards,
        isLoading: false,
      });
    });
  }

  updateMilestone() {
    this.state.scorecards.map(scorecard => {
      scorecardHelper.updateFinishedMilestone(scorecard);
    });
  }

  componentWillUnmount() {
    this.focusListener();
    AsyncStorage.removeItem(SELECTED_FILTERS);

    this.setState = (state, callback) => {
      return;
    };
  }

  renderScorecardItems(scorecards) {
    return (scorecards.map(scorecard => (
        <ScorecardListItem key={uuidv4()}
          onPress={() => this.onPress(scorecard)}
          scorecard={scorecard}
          showDeleteModal={() => this.setState({ visibleModal: true, selectedScorecard: scorecard })}
        />
      )
    ));
  }

  renderProgressScorecards(scorecards) {
    return (
      <View key={uuidv4()}>
        { this.renderScorecardItems(scorecards) }
      </View>
    )
  }

  renderFinishedScorecards(finishedScorecards) {
    let doms = [];

    for (let i = 0; i<finishedScorecards.length; i++) {
      const date = scorecardHelper.getTranslatedDate(finishedScorecards[i].date, this.context.appLanguage, 'MMM YYYY');

      doms.push(<ListSectionTitle title={date} key={uuidv4()} />)
      doms.push(<View key={uuidv4()}>{this.renderScorecardItems(finishedScorecards[i].scorecards)}</View>);
    }

    return doms;
  }

  onPress(scorecard) {
    const { translations } = this.context

    if (scorecard.isDeleted)
      return Alert.alert(translations.deletedScorecard, translations.theScorecardDeleted);

    this.props.setCurrentScorecard(scorecard);
    this.props.navigation.navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.displayName});
  }

  _renderNoData() {
    const { translations } = this.context

    return (
      <NoDataMessage
        title={translations.pleaseAddScorecard}
        buttonLabel={translations.startScorecard}
        onPress={() => this.props.navigation.reset({ index: 1, routes: [{ name: 'Home' }, {name: 'NewScorecard'}] })}
      />
    );
  }

  _confirmDelete() {
    const scorecardService = new ScorecardService();
    scorecardService.delete(this.state.selectedScorecard.uuid);

    this.setState({
      visibleModal: false,
      scorecards: Scorecard.getAll(),
      selectedScorecard: null,
    });
  }

  render() {
    const { translations } = this.context;
    const progressScorecards = this.state.scorecards.filter(s => !s.finished); 
    let finishedScorecards = this.state.scorecards.filter(s => s.finished);
    finishedScorecards = scorecardHelper.getGroupedByDate(finishedScorecards);
    const scorecardUuid = this.state.selectedScorecard ? this.state.selectedScorecard.uuid : '';

    if (!this.state.scorecards.length)
      return this._renderNoData();

    return (
      <View style={{flex: 1}}>
        { !this.state.isLoading &&
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 0, marginBottom: 0}} stickyHeaderIndices={getListStickyIndices(finishedScorecards)}>
            { !!progressScorecards.length && <ListSectionTitle title={translations.progressScorecards} /> }
            { !!progressScorecards.length && this.renderProgressScorecards(progressScorecards) }
            { this.renderFinishedScorecards(finishedScorecards) }
          </ScrollView>
        }

        <MessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          description={translations.formatString(translations.doYouWantToDeleteThisScorecard, scorecardUuid)}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this._confirmDelete()}
        />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardList);