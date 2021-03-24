import React from 'react';
import { Button } from 'react-native-paper';
import { normalLabelSize } from '../utils/responsive_util';

const SaveButton = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      labelStyle={{ color: '#fff', paddingTop: 2 }}
      style={{ marginLeft: 20 }}
      labelStyle={{fontSize: normalLabelSize, paddingTop: 2, color: '#fff'}}
    >
      {props.label}
    </Button>
  );
}

export default SaveButton;