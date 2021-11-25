import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';

import {
  Header,
  Title,
  Icon,
  Left,
  Right,
  Body,
} from "native-base";

import { HeaderBackButton } from '@react-navigation/stack';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import Color from '../themes/color';

import { getDeviceStyle, mobileHeadingTitleSize } from '../utils/responsive_util';
import BigHeaderTabletStyles from '../styles/tablet/BigHeaderComponentStyle';
import BigHeaderMobileStyles from '../styles/mobile/BigHeaderComponentStyle';
import { navigateBack } from '../utils/navigation_util';

const responsiveStyles = getDeviceStyle(BigHeaderTabletStyles, BigHeaderMobileStyles);

export default class BigHeader extends React.Component {
  render() {
    return (
      <Header span style={responsiveStyles.container}>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <Left>
            <HeaderBackButton tintColor={Color.whiteColor} onPress={ () => navigateBack() }/>
          </Left>

          <Body>
            <Title style={{fontSize: getDeviceStyle(19, mobileHeadingTitleSize())}}>{this.props.title}</Title>
          </Body>
        </View>

        <View style={{width: '100%'}}>
          <View style={{margin: 16}}>
            <Text style={[{fontFamily: FontFamily.title, color: Color.whiteColor}, responsiveStyles.bigTitle]}>{this.props.bigTitle}</Text>
          </View>
        </View>
      </Header>
    );
  }
}
