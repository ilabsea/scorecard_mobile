import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Icon, Button, Text } from 'native-base';
import { connect } from 'react-redux';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import BottomButton from '../../components/BottomButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';

import VotingCriteriaListItem from '../../components/VotingCriteria/VotingCriteriaListItem';
import { getAll, setVotingCriterias } from '../../actions/votingCriteriaAction';
import { set } from '../../actions/currentScorecardAction';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

import ParticipantInfo from '../../components/CreateNewIndicator/ParticipantInfo';
import ScorecardService from '../../services/scorecardService';
import * as participantService from '../../services/participant_service';

class VotingCriteriaList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.scorecardService = new ScorecardService();
    this.state = {
      scorecard: this.scorecardService.find(props.route.params.scorecard_uuid),
    };
  }

  componentDidMount() {
    if (this.state.scorecard.status < 4) {
      this.scorecardService.update(this.state.scorecard.uuid, {status: '4'})
      this.props.setCurrentScorecard(this.state.scorecard);
    }

    this.props.refreshVotingCriteriaState(this.state.scorecard.uuid);
  }

  _renderHeader() {
    const { translations } = this.context;

    return (
      <HorizontalProgressHeader
        title={translations.voting}
        navigation={this.props.navigation}
        progressIndex={3}/>
    )
  }

  _renderList() {
    return this.props.votingCriterias.map((item, index) => <VotingCriteriaListItem criteria={item} key={index}/>);
  }

  _goNext() {
    this.props.navigation.navigate('OfflineScorecardResult', {scorecard_uuid: this.state.scorecard.uuid});
  }

  _goToVotingForm(participant_uuid) {
    this.props.navigation.navigate('VotingCriteriaForm', {scorecard_uuid: this.state.scorecard.uuid, participant_uuid: participant_uuid});
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.h1, {flex: 1}]}>{translations.top_indicators} {this.props.votingCriterias.length}</Text>

          <ParticipantInfo
            participants={ participantService.getUnvoted(this.state.scorecard.uuid) }
            scorecard_uuid={ this.state.scorecard.uuid }
            mode={{type: 'button', label: translations.newVote, iconName: 'plus'}}
            onPressItem={(participant) => this._goToVotingForm(participant.uuid)}
            onPressCreateParticipant={(participant) => this._goToVotingForm(participant.uuid)}
            navigation={this.props.navigation}/>
        </View>

        { this._renderList() }
      </View>
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        <ScrollView contentContainerStyle={styles.container}>
          <Tip screenName={'VotingCriteriaList'}/>

          { this._renderContent() }
        </ScrollView>

        <View style={styles.container}>
          <BottomButton
            onPress={() => this._goNext()}
            customBackgroundColor={Color.headerColor}
            label={translations.next}/>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    votingCriterias: state.votingCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    refreshVotingCriteriaState: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
    setVotingCriterias: (criterias) => dispatch(setVotingCriterias(criterias)),
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VotingCriteriaList);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  h1: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    marginBottom: 20
  }
})
