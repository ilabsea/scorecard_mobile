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
import {getLanguageIndicator} from '../../services/language_indicator_service';
import { getDeviceStyle } from '../../utils/responsive_util';
import cardItemTabletStyles, {tabletLabelFontSize} from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles, {mobileLabelFontSize} from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);
const cardLabelFontSize = getDeviceStyle(tabletLabelFontSize, mobileLabelFontSize)

class ProposeNewIndicatorCardItem extends React.Component {
  static contextType = LocalizationContext;

  getIndicatorName = () => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUuid, this.props.indicatorableId, 'text');

    if (languageIndicator != undefined && !!languageIndicator.content)
      return languageIndicator.content

    return this.props.indicatorName.split(":").pop();
  }

  renderCardLabel  = () => {
    const { translations } = this.context;
    const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, this.props.indicatorableId);

    return <View style={styles.indicatorOutlinedLabelContainer}>
              {/* <TextHighlight textToHighlight={indicator.name} searchWords={[this.props.searchedText]} fontSize={cardLabelFontSize} fontFamily={FontFamily.body} /> */}
              <Text numberOfLines={2} style={styles.label}>{this.getIndicatorName()}</Text>
              <Text style={[styles.subLabel, {color: Color.lightGrayColor}]}>{translations.formatString(translations.numberOfRaisedParticipant, raisedParticipants.length)}</Text>
           </View>
  }

  render() {
    return <AudioCardView
              audio={this.props.audio}
              audioPosition='top-left'
              containerStyle={[styles.indicatorOutlinedCardContainer, this.props.containerStyle]}
              titleStyle={styles.label}
              subtitleStyle={styles.subLabel}
              customIconSet={{play: 'play-circle', pause: 'pause-circle', mute: 'repeat'}}
              onPress={() => this.props.onPressItem()}
            >
              {this.renderCardLabel()}
            </AudioCardView>
  }
}

export default ProposeNewIndicatorCardItem