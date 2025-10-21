import React from 'react';
import { Text } from 'react-native';

import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const PressableLabel = (props) => {
  return <Text style={[{ color: Color.clickableColor, fontSize: bodyFontSize(), fontFamily: FontFamily.body }, props.customStyles]}>
            { props.label }
         </Text>
}

export default PressableLabel;