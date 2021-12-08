import React from 'react';
import { Button } from 'react-native-paper';
import { normalLabelSize } from '../utils/responsive_util';
import Color from '../themes/color';

const SaveButton = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      style={{ marginLeft: 20, height: 51 }}
      labelStyle={{fontSize: normalLabelSize, color: Color.whiteColor}}
      contentStyle={{height: 51}}
    >
      {props.label}
    </Button>
  );
}

export default SaveButton;