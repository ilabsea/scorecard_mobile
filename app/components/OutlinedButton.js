import React, { Component } from 'react';

import { Button, Icon, Text } from 'native-base';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import OutlinedButtonTabletStyles from '../assets/stylesheets/components/tablet/OutlinedButtonStyle';
import OutlinedButtonMobileStyles from '../assets/stylesheets/components/mobile/OutlinedButtonStyle';

const styles = getDeviceStyle(OutlinedButtonTabletStyles, OutlinedButtonMobileStyles);

class OutlinedButton extends Component {
  render() {
    return (
      <Button
        {...this.props}
        bordered
        iconLeft
        style={{paddingLeft: 0, paddingRight: 0}}
      >
        {/* <Icon name={this.props.icon || 'plus'} type="FontAwesome" style={[{color: Color.headerColor}, this.props.iconStyle]} />
        <Text style={[{color: Color.headerColor}, this.props.labelStyle]}>{this.props.label}</Text> */}
        <Icon name={this.props.icon || 'plus'} type="FontAwesome" style={[{color: Color.headerColor}, this.props.iconStyle, styles.buttonIcon]} />
        <Text style={[{color: Color.headerColor}, this.props.labelStyle, styles.buttonLabel]}>{this.props.label}</Text>
      </Button>
    );
  }
}

export default OutlinedButton;
