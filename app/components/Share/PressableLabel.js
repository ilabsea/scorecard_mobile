import React from 'react';
import { Text } from 'react-native';

import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const PressableLabel = (props) => {
  return <Text style={[{ color: Color.clickableColor, fontSize: bodyFontSize() }, props.customStyles]}>
            { props.label }
         </Text>
}

export default PressableLabel;