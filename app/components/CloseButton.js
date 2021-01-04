import React from 'react';
import { Button } from 'react-native-paper';
import Color from '../themes/color';

const CloseButton = (props) => {
  return (
    <Button
      {...props}
      mode="outlined"
      style={{ borderWidth: 2, borderColor: Color.primaryButtonColor }}
    >
      {props.label}
    </Button>
  );
}

export default CloseButton;