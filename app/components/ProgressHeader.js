import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Icon,
  Left,
  Right,
  Body,
  Content,
  StyleProvider,
  Button,
} from "native-base";

import getTheme from '../themes/components';
import material from '../themes/variables/material';
import { HeaderBackButton } from '@react-navigation/stack';
import ProgressStep from '../components/ProgressStep';

export default class BigHeader extends React.Component {
  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  render() {
    return (
      <Header span>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
          <Left>
            <HeaderBackButton tintColor={"#fff"} onPress={() => this._onPress()}/>
          </Left>

          <Body>
            <Title>{this.props.title}</Title>
          </Body>

          <View>
            <Button transparent onPress={() => !!this.props.onPressHome && this.props.onPressHome()}>
              <Icon name='home' />
            </Button>
          </View>
        </View>

        <View style={{width: '100%'}}>
          <View style={{marginTop: 16, alignSelf: 'center'}}>
            <ProgressStep
              steps={!!this.props.steps && this.props.steps}
              progressIndex={this.props.progressIndex || 0}/>
          </View>
        </View>
      </Header>
    );
  }
}
