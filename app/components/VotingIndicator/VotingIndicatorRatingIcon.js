import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { LocalizationContext } from '../Translations';
import PlaySound from '../Share/PlaySound';
import Images from '../../utils/images';
import votingIndicatorService from '../../services/voting_indicator_service';
import { getDeviceStyle } from '../../utils/responsive_util';
import Color from '../../themes/color';
import IndicatorRatingItemTabletStyles from '../../styles/tablet/IndicatorRatingItemComponentStyle';
import IndicatorRatingItemMobileStyles from '../../styles/mobile/IndicatorRatingItemComponentStyle';

const responsiveStyles = getDeviceStyle(IndicatorRatingItemTabletStyles, IndicatorRatingItemMobileStyles);

class VotingIndicatorRatingIcon extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const { rating } = this.props;
    const ratingLanguage = this.props.getLanguageRatingScale(rating.label);
    const position = `${this.props.colIndex}${this.props.rowIndex}`;
    const buttonColor = ratingLanguage.local_audio ? Color.clickableColor : Color.grayColor;

    return (
      <View style={[responsiveStyles.ratingWrapper, this.props.activeIconStyle, this.props.activeBgStyle]}>
        <TouchableOpacity onPress={() => this.props.onClickIcon(rating) } style={responsiveStyles.ratingItemContainer}>
          <View style={[responsiveStyles.iconWrapper]}>
            <Image source={Images[rating.image]} style={responsiveStyles.ratingIcon} />
          </View>

          { DeviceInfo.isTablet() &&
            <Text style={responsiveStyles.ratingLabel}>{ratingLanguage.content}</Text>
          }
        </TouchableOpacity>

        <View style={{flex: 1}}></View>

        <PlaySound
          containerStyle={[responsiveStyles.ratingPlaySoundContainer, { borderColor: buttonColor }]}
          filePath={ratingLanguage.local_audio}
          isLocal={true}
          onPress={() => this.props.onClickIcon(rating)}
          onSavePlayingAudio={() => votingIndicatorService.savePlayingIndicatorAudio(position)}
          position={position}
          iconColor={buttonColor}
          useSmallIcon={true}
          hasBackground={false}
        >
          <Text style={[responsiveStyles.playSoundLabel, { color: buttonColor }]}>{translations.listen}</Text>
        </PlaySound>
      </View>
    )
  }
}

export default VotingIndicatorRatingIcon;