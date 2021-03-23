import React, { Component } from 'react';

import { Button, Icon, Text } from 'native-base';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import OutlinedButtonTabletStyles from './styles/tablet/OutlinedButtonStyle';
import OutlinedButtonMobileStyles from './styles/mobile/OutlinedButtonStyle';

const responsiveStyles = getDeviceStyle(OutlinedButtonTabletStyles, OutlinedButtonMobileStyles);

class OutlinedButton extends Component {
  render() {
    return (
      <Button
        {...this.props}
        bordered
        iconLeft
        style={{padding: 0}}
      >
        <Icon name={this.props.icon || 'plus'} type="FontAwesome"
          style={[{color: Color.headerColor}, responsiveStyles.buttonIcon]}
        />
        <Text style={[{color: Color.headerColor}, responsiveStyles.buttonLabel]}>{this.props.label}</Text>
      </Button>
    );
  }
}

export default OutlinedButton;
