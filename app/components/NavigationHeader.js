import React, { Component } from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Appbar, View, Text} from 'react-native-paper';

import NavigationHeaderBody from './NavigationHeaderBody'
import Color from '../themes/color';
import { getDeviceStyle } from '../utils/responsive_util';
import { pressableItemSize } from '../utils/component_util';

class NavigationHeader extends Component {
  render() {
    return (
      <Appbar.Header style={{ backgroundColor: Color.headerColor }}>
        <Appbar.BackAction onPress={() => this.props.onBackPress()} color='white' />

        { this.props.children ? this.props.children : <NavigationHeaderBody title={this.props.title} /> }

        { !!this.props.rightComponent && this.props.rightComponent() }

        {/* { !this.props.hideRightComponent &&
          <View style={[{maxWidth: wp('14%'), alignSelf: 'center', marginRight: getDeviceStyle(-19, -6)}, this.props.rightButtonStyle]}>
            { !!this.props.rightComponent && this.props.rightComponent() }
          </View>
        } */}
      </Appbar.Header>
    )
  }
}

export default NavigationHeader;