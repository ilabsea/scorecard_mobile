import React from 'react';
import { Button } from 'react-native-paper';
import { getLabelFontSize } from '../utils/responsive_util';

const SaveButton = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      labelStyle={{ color: '#fff', paddingTop: 2 }}
      style={{ marginLeft: 20 }}
      labelStyle={{fontSize: getLabelFontSize(), color: '#fff', paddingTop: 2}}
    >
      {props.label}
    </Button>
  );
}

export default SaveButton;