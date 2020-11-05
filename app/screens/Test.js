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
  Button,
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
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <Left style={{backgroundColor: ''}}>
                <HeaderBackButton tintColor={"#fff"} style={{}}/>
              </Left>

              <Body>
                <Title>Welcome to</Title>
              </Body>
            </View>

            <View style={{width: '100%'}}>
              <View style={{width: '70%', marginLeft: 16, marginRight: 16, marginTop: 16, alignItems: 'center', alignSelf: 'center'}}>
                <StepProgress progressIndex={1}/>
              </View>
            </View>
          </Header>

        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({

});
