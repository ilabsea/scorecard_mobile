import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import BoldLabel from '../Share/BoldLabel';
import Color from '../../themes/color';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import indicatorHelper from '../../helpers/indicator_helper';

class ScorecardResultAccordionTitle extends Component {
  static contextType = LocalizationContext;
  render() {
    const indicator = indicatorHelper.getDisplayIndicator(this.props.indicator);
    const indicatorName = indicator.content || indicator.name;
    const textColor = this.props.isRequired ? { color: Color.redColor } : { color: Color.blackColor };

    return (
      <View style={{width: wp('70%')}}>
        <View style={{flexDirection: 'row'}}>
          <Text numberOfLines={1} style={styles.titleText}>{this.props.order}. { indicatorName }</Text>
          <Text style={[styles.titleText, textColor]}> *</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[{marginRight: 3}, styles.itemSubtitleText]}>{this.context.translations.score}:</Text>
          <BoldLabel label={this.props.indicator.median} customStyle={{fontSize: 12, color: Color.lightGrayColor}} />
        </View>
      </View>
    )
  }
}

export default ScorecardResultAccordionTitle;