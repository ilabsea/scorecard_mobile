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
  StyleProvider
} from "native-base";

import getTheme from '../themes/components';
import material from '../themes/variables/material';
import { HeaderBackButton } from '@react-navigation/stack';
import StepProgress from '../components/StepProgress';

export default class Test extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Header span>
            <View style={{flexDirection: 'row', marginTop: 16}}>
              <Left>
                <HeaderBackButton tintColor={"#fff"}/>
              </Left>

              <Body>
                <Title>Welcome to</Title>
              </Body>
            </View>

            <View style={{width: '100%'}}>
              <View style={{width: '70%', marginTop: 16, alignSelf: 'center'}}>
                <StepProgress progressIndex={1}/>
              </View>
            </View>
          </Header>

        </Container>
      </StyleProvider>
    );
  }
}
