import React, { Component } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import PressableParticipantInfo from '../Share/PressableParticipantInfo';
import Participant from '../../models/Participant';

class ProposeNewIndicatorParticipantInfo extends Component {
  static contextType = LocalizationContext;
  render() {
    return (
      <View style={[{paddingVertical: 10}, this.props.containerStyle]}>
        <PressableParticipantInfo
          title={this.context.translations.proposeTheIndicator}
          participants={Participant.getNotRaised(this.props.scorecardUuid)}
          scorecardUuid={ this.props.scorecardUuid }
          participantUuid={ this.props.participantUuid }
          buttonVisible={false}
          selectParticipant={(participant) => !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(participant.uuid)}
          formModalRef={this.props.bottomSheetRef}
          participantModalRef={this.props.formModalRef}
          isDisabled={this.props.isEdit}
        />
      </View>
    )
  }
}

export default ProposeNewIndicatorParticipantInfo;