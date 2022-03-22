import React, { Component } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantInfo from './ParticipantInfo';
import Color from '../../themes/color';
import Participant from '../../models/Participant';
import { subTitleFontSize } from '../../utils/font_size_util';

class CreateNewIndicatorParticipantInfo extends Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View>
        <Text style={{fontSize: subTitleFontSize(), color: Color.lightBlackColor}}>
          {this.context.translations.selectParticipant}
        </Text>

        <ParticipantInfo
          participants={Participant.getNotRaised(this.props.scorecardUuid)}
          scorecard_uuid={ this.props.scorecardUuid }
          participant_uuid={ this.props.participantUuid }
          buttonVisible={false}
          selectParticipant={(participant) => !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(participant.uuid)}
          formModalRef={this.props.formModalRef}
          participantModalRef={this.props.participantModalRef}
        />
      </View>
    )
  }
}

export default CreateNewIndicatorParticipantInfo;