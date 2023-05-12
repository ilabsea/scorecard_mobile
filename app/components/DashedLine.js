import React from 'react';
import { View } from 'react-native';
import Color from '../themes/color';

const DashedLine = (props) => {
  return (
    <View style={[{position: 'relative'}, props.containerStyle]}>
      <View style={{flex: 1, borderColor: Color.lightGrayColor, borderWidth: 2, borderStyle: 'dashed', borderRadius: 1}}/>
      <View style={{position: 'absolute', width: '100%', backgroundColor: 'white', height: 4, bottom: -1.2}}/>
    </View>
  )
}

export default DashedLine;