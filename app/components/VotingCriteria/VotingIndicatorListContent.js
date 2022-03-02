import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { LocalizationContext } from '../Translations';
import VotingCriteriaListItem from './VotingCriteriaListItem';
import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';
import BottomButton from '../BottomButton';
import Tip from '../Tip';
import { navigate } from '../../navigators/app_navigator';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { titleFontSize } from '../../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import * as participantService from '../../services/participant_service';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import { hasVoting } from '../../helpers/voting_criteria_helper';

class VotingIndicatorListContent extends React.Component {
  static contextType = LocalizationContext;

  _goNext() {
    scorecardTracingStepsService.trace(this.props.scorecard.uuid, 7);
    navigate('OfflineScorecardResult', {scorecard_uuid: this.props.scorecard.uuid});
  }

  _renderList() {
    return this.props.votingCriterias.map((item, index) => 
      <VotingCriteriaListItem criteria={item} key={index} scorecard={this.props.scorecard} votingInfoModalRef={this.props.votingInfoModalRef} infoModalRef={this.props.infoModalRef} />
    );
  }

  _goToVotingForm(participant_uuid) {
    navigate('VotingCriteriaForm', {scorecard_uuid: this.props.scorecard.uuid, participant_uuid: participant_uuid});
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.h1, {flex: 1}]}>{translations.top_indicators} {this.props.votingCriterias.length}</Text>

          <ParticipantInfo
            participants={ participantService.getUnvoted(this.props.scorecard.uuid) }
            scorecard_uuid={ this.props.scorecard.uuid }
            mode={{type: 'button', label: translations.newVote, iconName: 'plus'}}
            buttonVisible={true}
            onPressItem={(participant) => this._goToVotingForm(participant.uuid)}
            onPressCreateParticipant={(participant) => this._goToVotingForm(participant.uuid)}
          />
        </View>

        { this._renderList() }
      </View>
    )
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView contentContainerStyle={styles.container}>
          <Tip showTipModal={() => this.props.tipModalRef.current?.present()} />

          { this._renderContent() }
        </ScrollView>

        <View style={styles.container}>
          <BottomButton
            onPress={() => this._goNext()}
            customBackgroundColor={Color.headerColor}
            label={this.context.translations.next}
            disabled={!hasVoting(this.props.scorecard.uuid)}
          />
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: containerPadding,
  },
  h1: {
    fontSize: getDeviceStyle(24, titleFontSize()),
    fontFamily: FontFamily.title,
    marginBottom: getDeviceStyle(20, 30),
  }
})

export default VotingIndicatorListContent;