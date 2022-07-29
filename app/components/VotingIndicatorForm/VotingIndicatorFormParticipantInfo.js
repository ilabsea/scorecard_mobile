import React from 'react';
import { View } from 'react-native';

import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';
import HeaderTitle from '../HeaderTitle';
import { LocalizationContext } from '../Translations';

import Participant from '../../models/Participant';
import { getDeviceStyle } from '../../utils/responsive_util';

class VotingIndicatorFormParticipantInfo extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{paddingHorizontal: getDeviceStyle(16, 10)}}>
        <HeaderTitle subheading="pleaseVoteForTheProposedIndicatorsBelow"/>

        <ParticipantInfo
          title={this.context.translations.addNewVoting}
          participants={Participant.getUnvoted(this.props.scorecardUuid)}
          scorecardUuid={ this.props.scorecardUuid }
          participantUuid={ this.props.participantUuid }
          selectParticipant={(participant) => this.props.onGetParticipant(participant.uuid)}
          buttonVisible={false}
          participantModalRef={this.props.participantModalRef}
          formModalRef={this.props.formModalRef}
          closeModal={() => this.props.participantModalRef.current?.dismiss()}
        />
      </View>
    )
  }
}

export default VotingIndicatorFormParticipantInfo;