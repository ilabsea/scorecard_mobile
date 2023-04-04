import React from 'react';
import {View} from 'react-native';
import AudioCardView from 'react-native-audio-card-view';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { LocalizationContext } from '../Translations';
import ProposedIndicatorRaisedIndicatorBottomSheet from './ProposedIndicatorRaisedIndicatorBottomSheet';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import SwipeLeftButton from '../Share/SwipeLeftButton';
import Color from '../../themes/color';
import Participant from '../../models/Participant';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';

import InfoListTabletStyles from '../../styles/tablet/ProposedIndicatorInfoListComponentStyle';
import InfoListMobileStyles from '../../styles/mobile/ProposedIndicatorInfoListComponentStyle';

const styles = getDeviceStyle(InfoListTabletStyles, InfoListMobileStyles);

let listRef = []
let prevOpenedRow;
class ProposedIndicatorRaisedParticipantList extends React.Component {
  static contextType = LocalizationContext;
  showRaisedParticipant = (participant) => {
    this.props.formModalRef.current?.setBodyContent(<ProposedIndicatorRaisedIndicatorBottomSheet participant={participant} scorecardUuid={this.props.scorecardUuid}/>)
    this.props.participantModalRef.current?.present();
  }

  renderRightButtons = () => {
    const {translations} = this.context;
    return <View style={{flexDirection: 'row'}}>
              <SwipeLeftButton label={translations.edit} backgroundColor={Color.lightBlue} onPress={() => console.log('Edit ====== ')} customStyle={styles.swipeLeftButton} />
              <SwipeLeftButton label={translations.delete} onPress={() => console.log('delte ======')} customStyle={[styles.swipeLeftButton]} />
           </View>
  }

  handleCloseRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== listRef[index])
      prevOpenedRow.close();

    prevOpenedRow = listRef[index];
  }

  renderParticipantList = () => {
    const mobileFontSize = getMobileFontSizeByPixelRatio(14.2, 14);
    const fontSize = getDeviceStyle(bodyFontSize(), mobileFontSize);
    return Participant.getRaisedParticipants(this.props.scorecardUuid).map((participant, index) => {
      return (
        <Swipeable key={participant.uuid}
          ref={ref => { listRef[index] = ref }}
          renderRightActions={this.renderRightButtons}
          containerStyle={{paddingBottom: 6, paddingHorizontal: 2}}
          onSwipeableOpen={() => this.handleCloseRow(index) }
          enabled={!this.props.isIndicatorBase}
        >
          <AudioCardView
            containerStyle={styles.participantCardContainer}
            hideAudioPlayer={true}
            titleStyle={[{marginTop: 0}, styles.label]}
          >
            <ParticipantListItemInfo participant={participant} fontSize={fontSize} containerStyle={{flex: 1}} onPress={() => this.showRaisedParticipant(participant)} />
          </AudioCardView>
        </Swipeable>
      )
    })
  }

  render() {
    return <View style={{marginTop: 12}}>{this.renderParticipantList()}</View>
  }
}

export default ProposedIndicatorRaisedParticipantList