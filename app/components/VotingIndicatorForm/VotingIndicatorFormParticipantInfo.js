import React from 'react';
import { View } from 'react-native';

import PressableParticipantInfo from '../Share/PressableParticipantInfo';
import { LocalizationContext } from '../Translations';
import Participant from '../../models/Participant';
import { getDeviceStyle } from '../../utils/responsive_util';
import Color from '../../themes/color';

class VotingIndicatorFormParticipantInfo extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{paddingHorizontal: getDeviceStyle(16, 10), marginTop: 6}}>
        <PressableParticipantInfo
          title={this.context.translations.addNewVoting}
          participants={Participant.getUnvoted(this.props.scorecardUuid)}
          scorecardUuid={ this.props.scorecardUuid }
          participantUuid={ this.props.participantUuid }
          selectParticipant={(participant) => this.props.onGetParticipant(participant.uuid)}
          buttonVisible={false}
          participantModalRef={this.props.participantModalRef}
          formModalRef={this.props.formModalRef}
          closeModal={() => this.props.participantModalRef.current?.dismiss()}
          hideDivider={true}
          isOutlined={true}
          arrowIconStyle={{fontSize: 26, width: 18, color: Color.clickableColor, marginTop: -4}}
        />
      </View>
    )
  }
}

export default VotingIndicatorFormParticipantInfo;