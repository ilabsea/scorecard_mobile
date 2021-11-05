import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantInfo from './ParticipantInfo';
import Color from '../../themes/color';
import Participant from '../../models/Participant';
import { getDeviceStyle, mobileSubTitleSize } from '../../utils/responsive_util';
const headerTitleSize = getDeviceStyle(18, mobileSubTitleSize());

class CreateNewIndicatorParticipantInfo extends Component {
  static contextType = LocalizationContext;

  onUpdateParticipant(participantUuid) {
    !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(participantUuid);
  }

  render() {
    return (
      <View>
        <Text style={{fontSize: headerTitleSize, color: Color.lightBlackColor}}>
          {this.context.translations.selectParticipant}
        </Text>

        <ParticipantInfo
          participants={Participant.getNotRaised(this.props.scorecardUuid)}
          scorecard_uuid={ this.props.scorecardUuid }
          participant_uuid={ this.props.participantUuid }
          navigation={this.props.navigation}
          buttonVisible={false}
          onPressItem={(participant) => this.onUpdateParticipant(participant.uuid)}
          onPressCreateParticipant={(participant) => this.onUpdateParticipant(participant.uuid)}
        />
      </View>
    )
  }
}

export default CreateNewIndicatorParticipantInfo;