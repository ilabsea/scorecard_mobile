import React from 'react';
import {View} from 'react-native';
import AudioCardView from 'react-native-audio-card-view';

import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import Participant from '../../models/Participant';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

import InfoListTabletStyles from '../../styles/tablet/ProposedIndicatorInfoListComponentStyle';
import InfoListMobileStyles from '../../styles/mobile/ProposedIndicatorInfoListComponentStyle';

const styles = getDeviceStyle(InfoListTabletStyles, InfoListMobileStyles);

class ProposedIndicatorRaisedParticipantList extends React.Component {
  renderTitleText(participant) {
    const mobileFontSize = getMobileFontSizeByPixelRatio(14.2, 15);
    const fontSize = getDeviceStyle(bodyFontSize(), mobileFontSize);
    return <ParticipantListItemInfo participant={participant} fontSize={fontSize} containerStyle={{flex: 1}} />
  }

  renderParticipantList = () => {
    return Participant.getRaisedParticipants(this.props.scorecardUuid).map(participant => {
      return <AudioCardView
                key={participant.uuid}
                containerStyle={styles.participantCardContainer}
                hideAudioPlayer={true}
                titleStyle={[{marginTop: 0}, styles.label]}
                onPress={() => console.log('do something')}
             >
                {this.renderTitleText(participant)}
             </AudioCardView>
    })
  }

  render() {
    return <View style={{marginTop: 10}}>{this.renderParticipantList()}</View>
  }
}

export default ProposedIndicatorRaisedParticipantList