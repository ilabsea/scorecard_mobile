import React, { Component } from 'react';

import { Button, Icon, Text } from 'native-base';
import Color from '../themes/color';

class OutlinedButton extends Component {
  render() {
    return (
      <Button
        {...this.props}
        bordered
        iconLeft>
        <Icon name={this.props.icon || 'plus'} type="FontAwesome" style={[{color: Color.headerColor}, this.props.iconStyle]} />
        <Text style={[{color: Color.headerColor}, this.props.labelStyle]}>{this.props.label}</Text>
      </Button>
    );
  }
}

export default OutlinedButton;
