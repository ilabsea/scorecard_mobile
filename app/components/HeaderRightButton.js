import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';

import Color from '../themes/color';

class HeaderRightButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <AppIcon name={this.props.icon} size={20} color={Color.whiteColor} style={{padding: 16}} />
      </TouchableOpacity>
    )
  }
}

export default HeaderRightButton;