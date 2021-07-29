import React, { Component } from 'react'
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { getDeviceStyle } from '../utils/responsive_util';
import { mdLabelSize } from '../constants/mobile_font_size_constant';

class ListSectionTitle extends Component {
  render() {
    return (
      <View style={{paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#f2f2f2'}}>
        <Text style={{fontSize: getDeviceStyle(16, wp(mdLabelSize))}}>{ this.props.title }</Text>
      </View>
    )
  }
}

export default ListSectionTitle;