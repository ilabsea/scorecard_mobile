import React, { Component } from 'react'
import { View, Text } from 'react-native';

import { bodyFontSize } from '../utils/font_size_util';

class ListSectionTitle extends Component {
  render() {
    return (
      <View style={{paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#f2f2f2'}}>
        <Text style={{fontSize: bodyFontSize()}}>{ this.props.title }</Text>
      </View>
    )
  }
}

export default ListSectionTitle;