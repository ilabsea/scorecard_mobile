import React from 'react';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Color from '../../themes/color';
import {bodyFontSize} from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

class SwipeLeftButton extends React.Component {
  render() {
    return (
      <RectButton onPress={() => this.props.onPress()} style={[{backgroundColor: this.props.backgroundColor || Color.redColor, marginBottom: 0.5, width: 70}, this.props.customStyle]}>
        <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <Text style={[{color: Color.whiteColor, fontSize: bodyFontSize(), fontFamily: FontFamily.body}, this.props.labelStyle]}>{this.props.label}</Text>
        </View>
      </RectButton>
    )
  }
}

export default SwipeLeftButton