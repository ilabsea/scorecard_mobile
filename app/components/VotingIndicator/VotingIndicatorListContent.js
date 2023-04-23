import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';

import { LocalizationContext } from '../Translations';
import VotingIndicatorListItem from './VotingIndicatorListItem';
import PressableParticipantInfo from '../Share/PressableParticipantInfo';
import BottomButton from '../BottomButton';
import Tip from '../Share/Tip';
import { navigate } from '../../navigators/app_navigator';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { titleFontSize } from '../../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import Participant from '../../models/Participant';
import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import { hasVoting } from '../../helpers/voting_indicator_helper';

class VotingIndicatorListContent extends React.Component {
  static contextType = LocalizationContext;

  _goNext() {
    scorecardTracingStepsService.trace(this.props.scorecard.uuid, 7);
    navigate('OfflineScorecardResult', {scorecard_uuid: this.props.scorecard.uuid});
  }

  _renderList() {
    return this.props.votingIndicators.map((item, index) => 
      <VotingIndicatorListItem indicator={item} key={index}
        scorecard={this.props.scorecard}
        votingInfoModalRef={this.props.votingInfoModalRef}
        infoModalRef={this.props.infoModalRef}
      />
    );
  }

  closeModal() {
    this.props.updateModalVisible(false)
    this.props.participantModalRef.current?.dismiss();
  }

  _renderContent() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.h1, {flex: 1}]}>{translations.top_indicators} {this.props.votingIndicators.length}</Text>

          <PressableParticipantInfo
            title={translations.addNewVoting}
            participants={ Participant.getUnvoted(this.props.scorecard.uuid) }
            scorecardUuid={ this.props.scorecard.uuid }
            mode={{type: 'button', label: translations.newVote, iconName: 'plus'}}
            buttonVisible={true}
            selectParticipant={(participant) => navigate('VotingIndicatorForm', {scorecard_uuid: this.props.scorecard.uuid, participant_uuid: participant.uuid})}
            participantModalRef={this.props.participantModalRef}
            formModalRef={this.props.formModalRef}
            closeModal={() => this.closeModal()}
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
          <Tip screenName='VotingIndicatorList' showTipModal={() => this.props.tipModalRef.current?.present()} />

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