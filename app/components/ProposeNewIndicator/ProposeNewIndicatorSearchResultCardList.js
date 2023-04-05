import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AudioCardView from 'react-native-audio-card-view';
import TextHighlight from 'react-native-text-highlighter';

import {LocalizationContext} from '../Translations';
import OutlinedButton from '../OutlinedButton';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import participantHelper from '../../helpers/participant_helper';
import settingHelper from '../../helpers/setting_helper';
import Indicator from '../../models/Indicator';
import { getDeviceStyle } from '../../utils/responsive_util';
import cardItemTabletStyles, {tabletLabelFontSize} from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles, {mobileLabelFontSize} from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);
const cardLabelFontSize = getDeviceStyle(tabletLabelFontSize, mobileLabelFontSize)

class ProposeNewIndicatorSearchResultCardList extends React.Component {
  static contextType = LocalizationContext;

  renderCardLabel  = (indicator) => {
    const { translations } = this.context;
    const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, indicator.indicatorable_id);
    return <View style={styles.indicatorOutlinedLabelContainer}>
              {/* <TextHighlight textToHighlight={indicator.name} searchWords={[this.props.searchedText]} fontSize={cardLabelFontSize} fontFamily={FontFamily.body} /> */}
              <Text numberOfLines={2} style={styles.label}>{`${indicator.name}`}</Text>
              {/* <Text numberOfLines={2} style={styles.label}>{`${indicator.name}, ${indicator.name} ${indicator.name} ${indicator.name}`}</Text> */}
              <Text style={[styles.subLabel, {color: Color.lightGrayColor}]}>{translations.formatString(translations.numberOfRaisedParticipant, raisedParticipants.length)}</Text>
           </View>
  }

  renderResult = () => {
    return this.props.indicators.map(indicator => {
      return <View key={indicator.uuid} >
                <AudioCardView
                  audio={null}
                  audioPosition='top-left'
                  containerStyle={styles.indicatorOutlinedCardContainer}
                  titleStyle={styles.label}
                  subtitleStyle={styles.subLabel}
                  customIconSet={{play: 'play-circle', pause: 'pause-circle', mute: 'repeat'}}
                  onPress={() => console.log('do something')}
                >
                  {this.renderCardLabel(indicator)}
                </AudioCardView>
             </View>
    })
  }

  render() {
    return this.renderResult()
  }
}

export default ProposeNewIndicatorSearchResultCardList