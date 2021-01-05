import React from 'react';
import { Button } from 'react-native-paper';

const SaveButton = (props) => {
  return (
    <Button
      {...props}
      mode="contained"
      labelStyle={{ color: '#fff', paddingTop: 2 }}
      style={{ marginLeft: 20 }}
    >
      {props.label}
    </Button>
  );
}

export default SaveButton;