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
import { getResponsiveSize } from '../utils/responsive_util';

export default class BigHeader extends React.Component {
  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  render() {
    return (
      <Header span style={{height: getResponsiveSize(156, 140)}}>
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <Left>
            <HeaderBackButton tintColor={"#fff"} onPress={ () => this._onPress() }/>
          </Left>

          <Body>
            <Title>{this.props.title}</Title>
          </Body>
        </View>

        <View style={{width: '100%'}}>
          <View style={{margin: 16}}>
            <Text style={{fontSize: getResponsiveSize(28, 24), fontFamily: FontFamily.title, color: '#fff'}}>{this.props.bigTitle}</Text>
          </View>
        </View>
      </Header>
    );
  }
}
