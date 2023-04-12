import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AudioCardView from 'react-native-audio-card-view';
import TextHighlight from 'react-native-text-highlighter';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {LocalizationContext} from '../Translations';
import OutlinedButton from '../OutlinedButton';
import SwipeLeftButton from '../Share/SwipeLeftButton';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import participantHelper from '../../helpers/participant_helper';
import {getLanguageIndicator} from '../../services/language_indicator_service';
import {CUSTOM} from '../../constants/indicator_constant';
import { navigationRef } from '../../navigators/app_navigator';
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

  renderCardLabel = () => {
    const { translations } = this.context;
    const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, this.props.indicatorableId);

    return <View style={styles.indicatorOutlinedLabelContainer}>
              {/* <TextHighlight textToHighlight={indicator.name} searchWords={[this.props.searchedText]} fontSize={cardLabelFontSize} fontFamily={FontFamily.body} /> */}
              <Text numberOfLines={2} style={styles.label}>{this.getIndicatorName()}</Text>
              <Text style={[styles.subLabel, {color: Color.lightGrayColor}]}>{translations.formatString(translations.numberOfRaisedParticipant, raisedParticipants.length)}</Text>
           </View>
  }

  renderNewBadge = () => {
    return <View style={{backgroundColor: '#E6E7E9', width: 28, height: 20, position: 'absolute', top: 0.5, right: 0.5, borderTopRightRadius: 3, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 11, color: Color.grayColor}}>{this.context.translations.new}</Text>
           </View>
  }

  renderRightButtons = () => {
    const {translations} = this.context;
    const btnStyles = getDeviceStyle({ height: 116, marginTop: 46, width: 90 }, { height: 60, marginTop: 8 })
    return <View style={{flexDirection: 'row'}}>
              {this.props.indicatorType == CUSTOM &&
                <SwipeLeftButton label={translations.edit} backgroundColor={Color.lightBlue} customStyle={btnStyles} onPress={() => console.log('== go to edit custom indicator')} />
              }
              <SwipeLeftButton label={translations.delete} customStyle={btnStyles} onPress={() => this.props.onPressDelete && this.props.onPressDelete()} />
           </View>
  }

  render() {
    return (
      <Swipeable
        ref={ref => this.props.updateListRef && this.props.updateListRef(ref)}
        renderRightActions={() => (this.renderRightButtons())}
        containerStyle={{paddingBottom: 6, paddingHorizontal: 2}}
        enabled={this.props.isSwipeable}
        onSwipeableOpen={() => this.props.onSwipeableOpen()}
      >
        <AudioCardView
          audio={this.props.audio}
          audioPosition='top-left'
          containerStyle={[styles.indicatorOutlinedCardContainer, this.props.containerStyle]}
          titleStyle={styles.label}
          subtitleStyle={styles.subLabel}
          customIconSet={{play: 'play-circle', pause: 'pause-circle', mute: 'repeat'}}
          onPress={() => !!this.props.onPressItem && this.props.onPressItem()}
        >
          {this.renderCardLabel()}
          { this.props.indicatorType == CUSTOM && this.renderNewBadge() }
        </AudioCardView>
      </Swipeable>
    )
  }
}

export default ProposeNewIndicatorCardItem