import React from 'react';
import { Text } from 'react-native';

import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';

const BoldLabel = (props) => {
  return <Text style={{fontFamily: FontFamily.title, fontSize: bodyFontSize(), color: props.color || Color.blackColor}}>
            { props.label }
         </Text>
}

export default BoldLabel;