import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import Images from '../../utils/images';
import ratings from '../../db/jsons/ratings';
import { getPluralOrSingularWord } from '../../utils/translation_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

class VotingMedianInfo extends Component {
  static contextType = LocalizationContext;

  _renderIcon(icon, size) {
    let sizeRatio = size * 0.55;

    return (
      <Image source={Images[icon.image]} style={{width: sizeRatio, height: sizeRatio, maxWidth: size, maxHeight: size}} />
    )
  }

  _renderMedian() {
    const { translations } = this.context;
    let currentIcon = ratings.filter(x => x.value == this.props.criteria.median)[0];
    const iconSize = getDeviceStyle(56, 38);

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: getDeviceStyle(-3, -5)}}>
        <Text style={{fontSize: getDeviceStyle(22, 20)}}>(</Text>
        { this._renderIcon(currentIcon, iconSize) }
        <Text style={[responsiveStyles.normalText, { marginLeft: 8 }]}>{translations[currentIcon.label]}</Text>
        <Text style={{fontSize: getDeviceStyle(22, 20)}}>)</Text>
      </View>
    )
  }

  render() {
    const { translations, appLanguage } = this.context;
    return (
      <View style={{flexDirection: 'row', marginBottom: 20, marginTop: 10}}>
        <Text style={[{fontFamily: FontFamily.title}, responsiveStyles.header]}>
          { translations.score } : {this.props.criteria.median} { getPluralOrSingularWord(this.props.criteria.median, translations.point, appLanguage, 's') }
        </Text>

        <View style={{borderWidth: 0, marginLeft: 10}}>
          { this._renderMedian() }
        </View>
      </View>
    )
  }
}

export default VotingMedianInfo;