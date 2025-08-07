import React from 'react';
import { View, Text } from 'react-native';
import { Header, Left, Right } from "native-base";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { HeaderBackButton } from '@react-navigation/native-stack';
import { FontFamily } from '../assets/stylesheets/theme/font';
import Color from '../themes/color';

import NavigationHeaderBody from './NavigationHeaderBody';
import { getDeviceStyle, navigationBackButtonFlex } from '../utils/responsive_util';
import BigHeaderTabletStyles from '../styles/tablet/BigHeaderComponentStyle';
import BigHeaderMobileStyles from '../styles/mobile/BigHeaderComponentStyle';
import { navigateBack } from '../utils/navigation_util';

const responsiveStyles = getDeviceStyle(BigHeaderTabletStyles, BigHeaderMobileStyles);

export default class BigHeader extends React.Component {
  render() {
    return (
      <Header span style={responsiveStyles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
          <Left style={{flex: navigationBackButtonFlex, marginRight: getDeviceStyle(0, -4)}}>
            <HeaderBackButton tintColor={Color.whiteColor} onPress={() => !!this.props.onPressBack ? this.props.onPressBack() : navigateBack()} style={{ marginLeft: 0 }} />
          </Left>
          <NavigationHeaderBody title={this.props.title} />
          <Right style={{maxWidth: getDeviceStyle(wp('21%'), wp('14%')), marginRight: getDeviceStyle(4, -16)}}>
            { !!this.props.rightButton && this.props.rightButton }
          </Right>
        </View>
        <View style={{width: '100%'}}>
          <View style={{margin: 16, marginTop: 10}}>
            <Text style={[{fontFamily: FontFamily.title, color: Color.whiteColor}, responsiveStyles.bigTitle]}>{this.props.bigTitle}</Text>
          </View>
        </View>
      </Header>
    );
  }
}
