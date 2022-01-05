import React from 'react';
import { Button } from 'react-native-paper';
import { pressableItemSize } from '../utils/component_util';
import { bodyFontSize } from '../utils/font_size_util';
import { modalButtonPaddingVertical } from '../constants/component_style_constant';
import Color from '../themes/color';

const SaveButton = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      style={{ marginLeft: 20, height: pressableItemSize(modalButtonPaddingVertical) }}
      labelStyle={{fontSize: bodyFontSize(), color: Color.whiteColor}}
      contentStyle={{height: pressableItemSize(modalButtonPaddingVertical)}}
    >
      {props.label}
    </Button>
  );
}

export default SaveButton;