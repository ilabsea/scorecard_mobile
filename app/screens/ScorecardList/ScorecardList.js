import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';

import { LocalizationContext } from '../../components/Translations';
import ScorecardItem from '../../components/ScorecardItem';
import MessageModal from '../../components/MessageModal';
import NoDataMessage from '../../components/NoDataMessage';

import Color from '../../themes/color';
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

class ScorecardList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      selectedScorecard: null,
      scorecards: Scorecard.getAll(),
      secPosition: 0,
      stickyHeaderIndex: 0,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", async () => {
      this.setState({ isLoading: true });

      let selectedFilters = await AsyncStorage.getItem(SELECTED_FILTERS);
      selectedFilters = JSON.parse(selectedFilters);
      let scorecards = [];

      if (selectedFilters)
        scorecards = await scorecardFilterService.getFilteredScorecards(selectedFilters);
      else
        scorecards = Scorecard.getAll();

      this.setState({
        scorecards: scorecards,
        isLoading: false,
      });
    });
  }

  componentWillUnmount() {
    this.focusListener();
    AsyncStorage.removeItem(SELECTED_FILTERS);

    this.setState = (state, callback) => {
      return;
    };
  }

  renderList(scorecards) {
    return (scorecards.map((scorecard, index) => (
        <ScorecardItem
          key={uuidv4()}
          onPress={() => this.onPress(scorecard)}
          scorecard={scorecard}
          index={index}
          showDeleteModal={() => this.setState({ visibleModal: true, selectedScorecard: scorecard })}
        />
      )
    ));
  }

  renderProgressScorecards(scorecards) {
    return (
      <View key={uuidv4()}>
        { this.renderList(scorecards) }
      </View>
    )
  }

  renderScorecardDate(date) {
    return (
      <View key={uuidv4()} style={{paddingHorizontal: 16, paddingVertical: 5}}>
        <Text style={{fontSize: 14}}>{ Moment(date, 'DD/MM/YYYY').format('MMM DD, YYYY') }</Text>
      </View>
    )
  }

  renderFinishedScorecards(finishedScorecards) {
    const { appLanguage } = this.context;

    let doms = [];

    for (let i = 0; i<finishedScorecards.length; i++) {
      const date = scorecardHelper.getTranslatedDate(finishedScorecards[i].date, appLanguage);

      doms.push(this.renderSectionTitle(date));
      doms.push(<View key={uuidv4()}>{this.renderList(finishedScorecards[i].scorecards)}</View>);
    }

    return doms;
  }

  onPress(scorecard) {
    const { translations } = this.context

    if (scorecard.isDeleted) {
      return Alert.alert(translations.deletedScorecard, translations.theScorecardDeleted);
    }

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

  renderSectionTitle(title) {
    const titleSize = getDeviceStyle(16, wp(mdLabelSize));

    return (
      <View key={uuidv4()} style={{paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#f2f2f2'}}>
        <Text style={{fontSize: titleSize}}>
          { title }
        </Text>
      </View>
    )
  }

  getStickyIndices(finishedScorecards) {
    let indices = [0];

    finishedScorecards.map((scorecard, index) => {
      indices.push((index+1) * 2)
    });

    return indices;
  }

  render() {
    const { translations } = this.context;
    const progressScorecards = this.state.scorecards.filter(s => !s.finished); 
    let finishedScorecards = this.state.scorecards.filter(s => s.finished);
    finishedScorecards = scorecardHelper.getGroupedByDate(finishedScorecards);

    const scorecardUuid = this.state.selectedScorecard ? this.state.selectedScorecard.uuid : '';

    if (!this.state.scorecards.length) {
      return this._renderNoData();
    }

    return (
      <View style={{flex: 1}}>
        { !this.state.isLoading &&
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 0, marginBottom: 0}} stickyHeaderIndices={this.getStickyIndices(finishedScorecards)}>
            { !!progressScorecards.length && this.renderSectionTitle(translations.progressScorecards) }
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
