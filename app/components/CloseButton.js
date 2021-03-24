import React from 'react';
import { Button } from 'react-native-paper';
import Color from '../themes/color';
import { normalLabelSize } from '../utils/responsive_util';

const CloseButton = (props) => {
  return (
    <Button
      {...props}
      mode="outlined"
      style={{ borderWidth: 2, borderColor: Color.primaryButtonColor }}
      labelStyle={{fontSize: normalLabelSize}}
    >
      {props.label}
    </Button>
  );
}

export default CloseButton;