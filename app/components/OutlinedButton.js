import React, { Component } from 'react';

import { Button, Icon, Text } from 'native-base';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import { pressableItemSize } from '../constants/components_size_constant';
import OutlinedButtonTabletStyles from '../styles/tablet/OutlinedButtonComponentStyle';
import OutlinedButtonMobileStyles from '../styles/mobile/OutlinedButtonComponentStyle';

const responsiveStyles = getDeviceStyle(OutlinedButtonTabletStyles, OutlinedButtonMobileStyles);

class OutlinedButton extends Component {
  render() {
    return (
      <Button
        {...this.props}
        bordered
        iconLeft
        style={{padding: 0, height: pressableItemSize}}
      >
        <Icon name={this.props.icon || 'plus'} type="FontAwesome"
          style={[{color: Color.headerColor}, responsiveStyles.buttonIcon, this.props.buttonColor]}
        />
        <Text style={[{color: Color.headerColor}, responsiveStyles.buttonLabel, this.props.buttonColor]}>{this.props.label}</Text>
      </Button>
    );
  }
}

export default OutlinedButton;
