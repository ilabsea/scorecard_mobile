import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantInfo from './ParticipantInfo';
import Color from '../../themes/color';
import Participant from '../../models/Participant';
import { subTitleFontSize } from '../../utils/font_size_util';

class CreateNewIndicatorParticipantInfo extends Component {
  static contextType = LocalizationContext;

  onUpdateParticipant(participantUuid) {
    !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(participantUuid);
  }

  render() {
    return (
      <View>
        <Text style={{fontSize: subTitleFontSize(), color: Color.lightBlackColor}}>
          {this.context.translations.selectParticipant}
        </Text>

        <ParticipantInfo
          participants={Participant.getNotRaised(this.props.scorecardUuid, this.props.participantUuid)}
          scorecardUuid={ this.props.scorecardUuid }
          participantUuid={ this.props.participantUuid }
          navigation={this.props.navigation}
          buttonVisible={false}
          onPressItem={(participant) => this.onUpdateParticipant(participant.uuid)}
          onPressCreateParticipant={(participant) => this.onUpdateParticipant(participant.uuid)}
          formModalRef={this.props.formModalRef}
          participantModalRef={this.props.participantModalRef}
        />
      </View>
    )
  }
}

export default CreateNewIndicatorParticipantInfo;