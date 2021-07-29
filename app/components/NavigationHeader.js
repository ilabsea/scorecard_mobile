import React, { Component } from 'react';
import { Header, Left, Body, Right, Title } from "native-base";
import { HeaderBackButton } from '@react-navigation/stack';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Color from '../themes/color';
import { getDeviceStyle, mobileHeadingTitleSize } from '../utils/responsive_util';

class NavigationHeader extends Component {
  render() {
    return (
      <Header style={{alignItems: 'center'}}>
        <Left>
          <HeaderBackButton tintColor={Color.whiteColor} onPress={() => this.props.onBackPress()} style={{ marginLeft: getDeviceStyle(11, 0) }} />
        </Left>

        <Body style={[{flex: 2, paddingLeft: wp('10%')}, this.props.bodyStyle]}>
          <Title style={{fontSize: getDeviceStyle(19, mobileHeadingTitleSize())}}>{ this.props.title }</Title>
        </Body>

        <Right style={[{maxWidth: wp('14%')}, this.props.rightButtonStyle]}>
          { this.props.rightComponent() }
        </Right>
      </Header>
    )
  }
}

export default NavigationHeader;