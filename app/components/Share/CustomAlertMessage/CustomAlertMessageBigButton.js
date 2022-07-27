import React from 'react';
import { View } from 'react-native';

import SaveButton from '../../SaveButton';
import CustomStyle from '../../../themes/customStyle';

const CustomAlertMessageBigButton = (props) => {
  return (
    <View style={[CustomStyle.modalBtnWrapper, { justifyContent: 'center' }]}>
      <SaveButton label={ props.label } onPress={() => props.onPress()}
        customStyle={{ width: '100%', marginLeft: 0 }}
      />
    </View>
  )
}

export default CustomAlertMessageBigButton;