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

export default class BigHeader extends React.Component {
  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  render() {
    return (
      <Header span>
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
            <Text style={{fontSize: 28, fontWeight: 'bold', color: '#fff'}}>{this.props.bigTitle}</Text>
          </View>
        </View>
      </Header>
    );
  }
}
