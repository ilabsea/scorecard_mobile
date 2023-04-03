import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BottomSheetModalTitle from '../BottomSheetModalTitle';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';
import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import participantHelper from '../../helpers/participant_helper';
import { bodyFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import itemStyles from '../../themes/participantListItemStyle';
import { participantContentHeight } from '../../constants/modal_constant';

class ProposedIndicatorRaisedParticipantBottomSheet extends React.Component {
  static contextType = LocalizationContext;
  renderTitleText(participant) {
    const mobileFontSize = getMobileFontSizeByPixelRatio(14.2, 15);
    const fontSize = getDeviceStyle(bodyFontSize(), mobileFontSize);
    return <ParticipantListItemInfo participant={participant} fontSize={fontSize} containerStyle={{flex: 1}} />
  }

  renderParticipants = () => {
    const mobileFontSize = getMobileFontSizeByPixelRatio(14.2, 15);
    const fontSize = getDeviceStyle(bodyFontSize(), mobileFontSize);
    return participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, this.props.indicator.indicatorable_id).map(participant => {
      return <React.Fragment>
                <ParticipantListItemInfo participant={participant} fontSize={fontSize} containerStyle={itemStyles.participantItem} />
                <Divider/>
             </React.Fragment>
    })
  }

  render() {
    return (
      <View style={{backgroundColor: Color.whiteColor, height: hp(participantContentHeight)}}>
        <BottomSheetModalTitle title={this.props.indicator.name} />
        <View style={{flex: 1, padding: containerPadding}}>
          <Text style={{fontSize: bodyFontSize()}}>{this.context.translations.raisedParticipant}</Text>
          <ScrollView contentContainerStyle={{borderWidth: 0, flexGrow: 1}}>
            {this.renderParticipants()}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorRaisedParticipantBottomSheet