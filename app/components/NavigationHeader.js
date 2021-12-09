import React, { Component } from 'react';
import { Header, Left, Right } from "native-base";
import { HeaderBackButton } from '@react-navigation/stack';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import NavigationHeaderBody from './NavigationHeaderBody'
import Color from '../themes/color';
import { getDeviceStyle, navigationBackButtonFlex } from '../utils/responsive_util';
import { pressableItemSize } from '../utils/component_util';

class NavigationHeader extends Component {
  render() {
    return (
      <Header style={{alignItems: 'center'}}>
        <Left style={{ flex: navigationBackButtonFlex }}>
          <HeaderBackButton tintColor={Color.whiteColor} onPress={() => this.props.onBackPress()} style={{ marginLeft: 0, width: pressableItemSize(), height: pressableItemSize() }} />
        </Left>

        <NavigationHeaderBody title={this.props.title} />

        <Right style={[{maxWidth: wp('14%'), alignSelf: 'center', marginRight: getDeviceStyle(-19, -6)}, this.props.rightButtonStyle]}>
          { this.props.rightComponent() }
        </Right>
      </Header>
    )
  }
}

export default NavigationHeader;