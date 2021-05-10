import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../../components/Translations';
import ScorecardItem from '../../components/ScorecardItem';
import MessageModal from '../../components/MessageModal';
import NoDataMessage from '../../components/NoDataMessage';

import uuidv4 from '../../utils/uuidv4';
import Scorecard from '../../models/Scorecard';

import ScorecardService from '../../services/scorecardService';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

import { getDeviceStyle } from '../../utils/responsive_util';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';

class ScorecardList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
      selectedScorecard: null,
      scorecards: Scorecard.getAll(),
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.setState({ scorecards: Scorecard.getAll() });
    });
  }

  componentWillUnmount() {
    this.focusListener();

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
        buttonLabel={translations.newScorecard}
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
    });
  }

  render() {
    const { translations } = this.context;
    const completedStatus = '5';
    const progressScorecards = this.state.scorecards.filter(s => s.status != completedStatus);
    const completeScorecards = this.state.scorecards.filter(s => s.status == completedStatus);
    const titleSize = getDeviceStyle(16, wp(mdLabelSize));

    if (!this.state.scorecards.length) {
      return this._renderNoData();
    }

    return (
      <ScrollView>
        <View style={{flex: 1, padding: 16}}>
          { !!progressScorecards.length && <Text style={{marginBottom: 10, fontSize: titleSize}}>{translations.progressScorecards}</Text>}
          { this.renderList(progressScorecards) }

          { !!completeScorecards.length && <Text style={{marginBottom: 10, fontSize: titleSize}}>{translations.completeScorecards}</Text>}
          { this.renderList(completeScorecards) }

          <MessageModal
            visible={this.state.visibleModal}
            onDismiss={() => this.setState({visibleModal: false})}
            title={translations.deleteScorecard}
            description={translations.doYouWantToDeleteThisScorecard}
            hasConfirmButton={true}
            confirmButtonLabel={translations.ok}
            onPressConfirmButton={() => this._confirmDelete()}
          />
        </View>
      </ScrollView>
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
