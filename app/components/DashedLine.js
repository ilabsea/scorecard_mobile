import React from 'react';
import { View, Dimensions } from 'react-native';
import Color from '../themes/color';

const DashedLine = (props) => {
  const screenWidth = parseInt(Dimensions.get('screen').width);
  let dashedLine = [];
    for(let i = 0; i < screenWidth; i++) {
      dashedLine.push(<View key={i} style={{backgroundColor: Color.lightGrayColor, width: 7, height: 1.5, marginRight: 3}} />);
    }

  return (
    <View style={[{flex: 1, flexDirection: 'row'}, props.containerStyle]}>
      { dashedLine }
    </View>
  )
}

export default DashedLine;