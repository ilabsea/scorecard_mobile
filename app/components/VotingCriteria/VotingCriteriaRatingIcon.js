import React, {Component} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { LocalizationContext } from '../Translations';
import PlaySound from './PlaySound';
import Images from '../../utils/images';
import votingCriteriaService from '../../services/votingCriteriaService';
import { getDeviceStyle } from '../../utils/responsive_util';
import CriteriaRatingItemTabletStyles from '../../styles/tablet/CriteriaRatingItemComponentStyle';
import CriteriaRatingItemMobileStyles from '../../styles/mobile/CriteriaRatingItemComponentStyle';

const responsiveStyles = getDeviceStyle(CriteriaRatingItemTabletStyles, CriteriaRatingItemMobileStyles);

class VotingCriteriaRatingIcon extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const { rating } = this.props;
    const ratingLanguage = this.props.getLanguageRatingScale(rating.label);
    const position = `${this.props.colIndex}${this.props.rowIndex}`;

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
          containerStyle={responsiveStyles.ratingPlaySoundContainer}
          filePath={ratingLanguage.local_audio}
          isLocal={true}
          onPress={() => this.props.onClickIcon(rating)}
          onSavePlayingAudio={() => votingCriteriaService.savePlayingCriteriaAudio(position)}
          position={position}
        >
          <Text style={responsiveStyles.playSoundLabel}>{translations.listen}</Text>
        </PlaySound>
      </View>
    )
  }
}

export default VotingCriteriaRatingIcon;