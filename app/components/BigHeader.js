import React from 'react';
import { View, Text } from 'react-native';

import {
  Header,
  Title,
  Left,
  Right,
  Body,
} from "native-base";

import { HeaderBackButton } from '@react-navigation/stack';
import { FontSize, FontFamily } from '../assets/stylesheets/theme/font';
import Color from '../themes/color';

import { getDeviceStyle } from '../utils/responsive_util';
import BigHeaderTabletStyles from '../styles/tablet/BigHeaderComponentStyle';
import BigHeaderMobileStyles from '../styles/mobile/BigHeaderComponentStyle';
import { navigateBack } from '../utils/navigation_util';
import { navigationHeaderTitleFontSize } from '../utils/font_size_util';

const responsiveStyles = getDeviceStyle(BigHeaderTabletStyles, BigHeaderMobileStyles);

export default class BigHeader extends React.Component {
  render() {
    return (
      <Header span style={responsiveStyles.container}>
        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <Left>
            <HeaderBackButton tintColor={Color.whiteColor} onPress={ () => navigateBack() }/>
          </Left>

          <Body>
            <Title style={{fontSize: navigationHeaderTitleFontSize()}}>{this.props.title}</Title>
          </Body>

          { !!this.props.rightButton &&
            <Right>
              { this.props.rightButton }
            </Right>
          }
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
