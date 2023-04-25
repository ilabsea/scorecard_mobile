import React from 'react';
import { View, Text } from 'react-native';
import TextHighlight from 'react-native-text-highlighter';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import {LocalizationContext} from '../Translations';
import SwipeLeftButton from '../Share/SwipeLeftButton';
import CustomAudioCard from '../Share/CustomAudioCard';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import participantHelper from '../../helpers/participant_helper';
import proposedIndicatorStyleHelper from '../../helpers/proposed_indicator_style_helper';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import {getLanguageIndicator} from '../../services/language_indicator_service';
import {CUSTOM} from '../../constants/indicator_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import {bodyFontSize} from '../../utils/font_size_util';
import cardItemTabletStyles from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);

class ProposeNewIndicatorCardItem extends React.Component {
  static contextType = LocalizationContext;

  getIndicatorName = () => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUuid, this.props.indicatorUuid, 'text');
    if (languageIndicator != undefined && !!languageIndicator.content)
      return languageIndicator.content

    return this.props.indicatorName.split(":").pop();
  }

  renderCardLabel = () => {
    const { translations } = this.context;
    const raisedParticipants = participantHelper.getRaisedParticipantByIndicator(this.props.scorecardUuid, this.props.indicatorableId);
    return <View style={styles.indicatorOutlinedLabelContainer}>
              <TextHighlight textToHighlight={this.getIndicatorName()} searchWords={[this.props.searchedText]} fontSize={bodyFontSize()} fontFamily={FontFamily.body} numberOfLines={2} />
              { this.props.isIndicatorBase && <Text style={[styles.subLabel, {color: Color.lightGrayColor}]}>{translations.formatString(translations.numberOfRaisedParticipant, raisedParticipants.length)}</Text> }
           </View>
  }

  renderNewBadge = () => {
    return <View style={{backgroundColor: '#E6E7E9', width: 28, height: 20, position: 'absolute', top: 0.2, right: 0.2, borderTopRightRadius: 5, borderBottomLeftRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 11, color: Color.grayColor}}>{this.context.translations.new}</Text>
           </View>
  }

  renderRightButtons = () => {
    const {translations} = this.context;
    const btnStyles = proposedIndicatorStyleHelper.getStyleByProposeType(this.props.isIndicatorBase, 'swipeableButton')
    return <View style={{flexDirection: 'row'}}>
              {this.props.indicatorType == CUSTOM &&
                <SwipeLeftButton label={translations.edit} backgroundColor={Color.lightBlue} customStyle={btnStyles} onPress={() => this.props.onPressEdit && this.props.onPressEdit()} />
              }
              <SwipeLeftButton label={translations.delete} customStyle={btnStyles} onPress={() => this.props.onPressDelete && this.props.onPressDelete()} />
           </View>
  }

  getAudio() {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUuid, this.props.indicatorUuid, 'audio');
    return languageIndicator != undefined ? languageIndicator.local_audio : null
  }

  renderCard() {
    return <CustomAudioCard
            isOutlined={true}
            itemUuid={this.props.indicatorUuid}
            customTitle={<TextHighlight textToHighlight={this.getIndicatorName()} searchWords={[this.props.searchedText]} fontSize={bodyFontSize()} fontFamily={FontFamily.body} numberOfLines={2} />}
            subtitle={this.props.isIndicatorBase && proposedIndicatorHelper.getCardSubtitle(this.context.translations, this.props.scorecardUuid, this.props.indicatorableId)}
            audio={this.getAudio()}
            playingUuid={this.props.playingUuid}
            updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
            containerStyle={[proposedIndicatorStyleHelper.getStyleByProposeType(this.props.isIndicatorBase, 'outlineCard'), this.props.containerStyle]}
            onPressItem={() => !!this.props.onPressItem && this.props.onPressItem()}
            badge={ this.props.indicatorType == CUSTOM && this.renderNewBadge() }
          />
  }

  render() {
    return (
      <Swipeable
        ref={ref => this.props.updateListRef && this.props.updateListRef(ref)}
        renderRightActions={() => (this.renderRightButtons())}
        containerStyle={{paddingBottom: 0, paddingHorizontal: 2}}
        enabled={this.props.isSwipeable}
        onSwipeableOpen={() => this.props.onSwipeableOpen()}
      >
        {this.renderCard()}
      </Swipeable>
    )
  }
}

export default ProposeNewIndicatorCardItem