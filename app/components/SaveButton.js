import React from 'react';
import { Button } from 'react-native-paper';
import { normalLabelSize } from '../utils/responsive_util';
import Color from '../themes/color';

const SaveButton = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      style={{ marginLeft: 20 }}
      labelStyle={{fontSize: normalLabelSize, paddingTop: 2, color: Color.whiteColor}}
    >
      {props.label}
    </Button>
  );
}

export default SaveButton;