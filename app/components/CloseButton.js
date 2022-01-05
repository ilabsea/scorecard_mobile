import React from 'react';
import { Button } from 'react-native-paper';
import Color from '../themes/color';
import { pressableItemSize } from '../utils/component_util';
import { bodyFontSize } from '../utils/font_size_util';
import { modalButtonPaddingVertical } from '../constants/component_style_constant';

const CloseButton = (props) => {
  return (
    <Button
      {...props}
      mode="outlined"
      style={{ borderWidth: 2, borderColor: Color.primaryButtonColor, height: pressableItemSize(modalButtonPaddingVertical) }}
      labelStyle={{fontSize: bodyFontSize()}}
      contentStyle={{height: pressableItemSize(modalButtonPaddingVertical), marginTop: -2}}
    >
      {props.label}
    </Button>
  );
}

export default CloseButton;