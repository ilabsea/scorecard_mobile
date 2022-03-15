import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import ratings from '../../db/jsons/ratings';
import { getVotingIcon } from '../../helpers/voting_criteria_helper';
import { getPluralOrSingularWord } from '../../utils/translation_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

class VotingMedianInfo extends Component {
  static contextType = LocalizationContext;

  _renderMedian() {
    const { translations } = this.context;
    let currentIcon = ratings.filter(x => x.value == this.props.indicator.median)[0];
    const iconSize = getDeviceStyle(56, 38);

    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: getDeviceStyle(-3, -5)}}>
        <Text style={{fontSize: getDeviceStyle(22, 20)}}>(</Text>
        { getVotingIcon(currentIcon, iconSize, 0.55) }
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
          { translations.score } : {this.props.indicator.median} { getPluralOrSingularWord(this.props.indicator.median, translations.point, appLanguage, 's') }
        </Text>

        <View style={{borderWidth: 0, marginLeft: 10}}>
          { this._renderMedian() }
        </View>
      </View>
    )
  }
}

export default VotingMedianInfo;