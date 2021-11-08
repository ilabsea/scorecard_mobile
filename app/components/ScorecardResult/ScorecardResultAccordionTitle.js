import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import indicatorHelper from '../../helpers/indicator_helper';

class ScorecardResultAccordionTitle extends Component {
  render() {
    const indicator = indicatorHelper.getDisplayIndicator(this.props.criteria);
    const indicatorName = indicator.content || indicator.name;
    const textColor = this.props.isRequired ? { color: Color.redColor } : { color: Color.blackColor };

    return (
      <View style={{flexDirection: 'row', width: wp('70%')}}>
        <Text numberOfLines={1} style={styles.titleText}>{this.props.order}. { indicatorName }</Text>
        <Text style={[styles.titleText, textColor]}> *</Text>
      </View>
    )
  }
}

export default ScorecardResultAccordionTitle;