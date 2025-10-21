import React from 'react';
import { Button } from 'react-native-paper';
import { pressableItemSize } from '../utils/component_util';
import { bottomButtonFontSize } from '../utils/font_size_util';
import { modalButtonPaddingVertical, textLineHeight } from '../constants/component_style_constant';
import { buttonBorderRadius } from '../constants/border_radius_constant';
import Color from '../themes/color';
import { FontFamily } from '../assets/stylesheets/theme/font';

const SaveButton = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      style={[{ marginLeft: 20, height: pressableItemSize(modalButtonPaddingVertical), borderRadius: buttonBorderRadius}, props.customStyle]}
      labelStyle={[{fontSize: bottomButtonFontSize(), color: Color.whiteColor, alignSelf: 'center', lineHeight: textLineHeight, fontFamily: FontFamily.body}, props.labelStyle]}
      contentStyle={{height: pressableItemSize(modalButtonPaddingVertical)}}
    >
      {props.label}
    </Button>
  );
}

export default SaveButton;