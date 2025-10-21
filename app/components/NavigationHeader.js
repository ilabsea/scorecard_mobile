import React, { Component } from 'react';
import {Appbar} from 'react-native-paper';

import NavigationHeaderBody from './NavigationHeaderBody'
import Color from '../themes/color';

class NavigationHeader extends Component {
  render() {
    return (
      <Appbar.Header style={{ backgroundColor: Color.headerColor }}>
        <Appbar.BackAction onPress={() => this.props.onBackPress()} color='white' />

        { this.props.children ? this.props.children : <NavigationHeaderBody title={this.props.title} /> }

        { !!this.props.rightComponent && this.props.rightComponent() }
      </Appbar.Header>
    )
  }
}

export default NavigationHeader;