import React from 'react';
import { View } from 'react-native';

import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';
import HeaderTitle from '../HeaderTitle';

import Participant from '../../models/Participant';
import { getDeviceStyle } from '../../utils/responsive_util';

class VotingIndicatorFormParticipantInfo extends React.Component {
  render() {
    return (
      <View style={{paddingHorizontal: getDeviceStyle(16, 10)}}>
        <HeaderTitle headline="addNewScorecardVoting" subheading="pleaseFillInformationBelow"/>

        <ParticipantInfo
          participants={Participant.getUnvoted(this.props.scorecardUuid)}
          scorecardUuid={ this.props.scorecardUuid }
          participantUuid={ this.props.participantUuid }
          onGetParticipant={(participant) => this.props.onGetParticipant(participant.uuid)}
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