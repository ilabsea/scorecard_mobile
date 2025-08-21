import React from 'react';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

import { FontFamily } from '../assets/stylesheets/theme/font';
import Color from '../themes/color';

import NavigationHeaderBody from './NavigationHeaderBody';
import { getDeviceStyle } from '../utils/responsive_util';
import BigHeaderTabletStyles from '../styles/tablet/BigHeaderComponentStyle';
import BigHeaderMobileStyles from '../styles/mobile/BigHeaderComponentStyle';
import { navigateBack } from '../utils/navigation_util';

const responsiveStyles = getDeviceStyle(BigHeaderTabletStyles, BigHeaderMobileStyles);

export default class BigHeader extends React.Component {
  render() {
    return (
      <View style={responsiveStyles.container}>
        <Appbar.Header style={{backgroundColor: Color.headerColor}}>
          <Appbar.BackAction onPress={() => !!this.props.onPressBack ? this.props.onPressBack() : navigateBack()} color='white' />
          <NavigationHeaderBody title={this.props.title} />
          { !!this.props.rightButton && this.props.rightButton }
        </Appbar.Header>

        <View style={{width: '100%'}}>
          <View style={{margin: 16, marginTop: 10}}>
            <Text style={[{fontFamily: FontFamily.title, color: Color.whiteColor}, responsiveStyles.bigTitle]}>{this.props.bigTitle}</Text>
          </View>
        </View>
      </View>
    );
  }
}
