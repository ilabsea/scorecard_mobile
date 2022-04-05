import React from 'react';
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class ProposedIndicatorMethodDetailsTitle extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const {translations} = this.context;
    const { selectedMethod, proposeMethod } = this.props;

    const selectLabel = selectedMethod === proposeMethod.value ? translations.selected : translations.select;
    const textColor = selectedMethod === proposeMethod.value ? Color.lightGrayColor : Color.clickableColor;
    const titleWidth = getDeviceStyle(wp('81%'), wp('73%'));

    return (
      <View style={{ flexDirection: 'row', width: titleWidth, position: 'relative' }}>
        <Text style={{flex: 1, fontSize: bodyFontSize()}}>{proposeMethod.label}</Text>
        <Text style={{ color: textColor, fontFamily: FontFamily.title, fontSize: bodyFontSize() }}>{ selectLabel }</Text>
      </View>
    )
  }
}

export default ProposedIndicatorMethodDetailsTitle;