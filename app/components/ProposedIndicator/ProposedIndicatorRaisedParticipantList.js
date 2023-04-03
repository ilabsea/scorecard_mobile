import React from 'react';
import {View} from 'react-native';
import AudioCardView from 'react-native-audio-card-view';

import ProposedIndicatorRaisedIndicatorBottomSheet from './ProposedIndicatorRaisedIndicatorBottomSheet';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import Participant from '../../models/Participant';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

import InfoListTabletStyles from '../../styles/tablet/ProposedIndicatorInfoListComponentStyle';
import InfoListMobileStyles from '../../styles/mobile/ProposedIndicatorInfoListComponentStyle';

const styles = getDeviceStyle(InfoListTabletStyles, InfoListMobileStyles);

class ProposedIndicatorRaisedParticipantList extends React.Component {
  showRaisedParticipant = (participant) => {
    this.props.formModalRef.current?.setBodyContent(<ProposedIndicatorRaisedIndicatorBottomSheet participant={participant} scorecardUuid={this.props.scorecardUuid}/>)
    this.props.participantModalRef.current?.present();
  }

  renderParticipantList = () => {
    const mobileFontSize = getMobileFontSizeByPixelRatio(14.2, 15);
    const fontSize = getDeviceStyle(bodyFontSize(), mobileFontSize);
    return Participant.getRaisedParticipants(this.props.scorecardUuid).map(participant => {
      return <AudioCardView
                key={participant.uuid}
                containerStyle={styles.participantCardContainer}
                hideAudioPlayer={true}
                titleStyle={[{marginTop: 0}, styles.label]}
             >
                <ParticipantListItemInfo participant={participant} fontSize={fontSize} containerStyle={{flex: 1}} onPress={() => this.showRaisedParticipant(participant)} />
             </AudioCardView>
    })
  }

  render() {
    return <View style={{marginTop: 10}}>{this.renderParticipantList()}</View>
  }
}

export default ProposedIndicatorRaisedParticipantList