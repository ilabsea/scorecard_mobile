import React, { Component } from 'react';
import {View} from 'react-native';
import { Button, Icon, Text } from 'native-base';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import { pressableItemSize } from '../utils/component_util';
import OutlinedButtonTabletStyles from '../styles/tablet/OutlinedButtonComponentStyle';
import OutlinedButtonMobileStyles from '../styles/mobile/OutlinedButtonComponentStyle';

const responsiveStyles = getDeviceStyle(OutlinedButtonTabletStyles, OutlinedButtonMobileStyles);

class OutlinedButton extends Component {
  renderlabelAndSubLabel = () => {
    return <View style={{flex: 1}}>
              <Text style={[{color: Color.headerColor}, responsiveStyles.buttonLabel, this.props.buttonColor, this.props.labelStyle]}>{this.props.label}</Text>
              <Text numberOfLines={1} style={[responsiveStyles.buttonSubLabel, this.props.subLabelStyle]}>{this.props.subLabel}</Text>
           </View>
  }

  render() {
    return (
      <Button
        {...this.props}
        bordered
        iconLeft
        style={[{padding: 0, height: pressableItemSize()}, this.props.buttonStyle]}
      >
        <Icon name={this.props.icon || 'plus'} type="FontAwesome"
          style={[{color: Color.headerColor}, responsiveStyles.buttonIcon, this.props.buttonColor, this.props.iconStyle]}
        />
        { !!this.props.subLabel ? this.renderlabelAndSubLabel()
          : <Text style={[{color: Color.headerColor}, responsiveStyles.buttonLabel, this.props.buttonColor, this.props.labelStyle]}>{this.props.label}</Text>
        }
      </Button>
    );
  }
}

export default OutlinedButton;
