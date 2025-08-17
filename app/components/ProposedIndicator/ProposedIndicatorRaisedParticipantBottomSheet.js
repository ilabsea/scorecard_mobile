import React from 'react';
import { View, Text } from 'react-native';
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
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { participantModalContentHeight } from '../../constants/modal_constant';

class ProposedIndicatorRaisedParticipantBottomSheet extends React.Component {
  static contextType = LocalizationContext;
  renderParticipants = (raisedParticipants) => {
    const mobileFontSize = getMobileFontSizeByPixelRatio(14.2, 15);
    const fontSize = getDeviceStyle(bodyFontSize(), mobileFontSize);
    return raisedParticipants.map(participant => {
      return <View key={participant.uuid} style={{paddingLeft: 8}}>
                <ParticipantListItemInfo participant={participant} fontSize={fontSize} containerStyle={itemStyles.participantItem} />
                <Divider/>
             </View>
    })
  }

  render() {
    const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, this.props.indicator.indicatorable_id)
    return (
      <View style={{backgroundColor: Color.whiteColor, height: hp(participantModalContentHeight)}}>
        <BottomSheetModalTitle title={this.props.indicator.name} />
        <View style={{flex: 1, padding: containerPadding}}>
          <Text style={{fontSize: bodyFontSize(), fontFamily: FontFamily.body, marginBottom: 6}}>
            {this.context.translations.proposedParticipant} ({raisedParticipants.length}){this.context.appLanguage == 'km' ? '៖' : ':'}
          </Text>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {this.renderParticipants(raisedParticipants)}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorRaisedParticipantBottomSheet