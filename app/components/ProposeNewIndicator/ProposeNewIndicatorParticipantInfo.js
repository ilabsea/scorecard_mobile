import React, { Component } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantInfo from '../CreateNewIndicator/ParticipantInfo';
import Participant from '../../models/Participant';

class ProposeNewIndicatorParticipantInfo extends Component {
  static contextType = LocalizationContext;
  render() {
    return (
      <View style={[{paddingVertical: 10}, this.props.containerStyle]}>
        <ParticipantInfo
          title={this.context.translations.proposeTheIndicator}
          participants={Participant.getNotRaised(this.props.scorecardUuid)}
          scorecardUuid={ this.props.scorecardUuid }
          participantUuid={ this.props.participantUuid }
          buttonVisible={false}
          selectParticipant={(participant) => !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(participant.uuid)}
          formModalRef={this.props.bottomSheetRef}
          participantModalRef={this.props.formModalRef}
        />
      </View>
    )
  }
}

export default ProposeNewIndicatorParticipantInfo;