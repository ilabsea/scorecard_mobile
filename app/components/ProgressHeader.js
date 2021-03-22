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
import MessageModal from './MessageModal';
import { LocalizationContext } from './Translations';

export default class BigHeader extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
    };
  }

  _onPress() {
    !!this.props.onBackPress && this.props.onBackPress()
  }

  _goToHomeScreen() {
    this.setState({ visibleModal: false });
    !!this.props.onPressHome && this.props.onPressHome()
  }

  render() {
    const { translations } = this.context;

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
            <Button transparent onPress={() => this.setState({ visibleModal: true })}>
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

        <MessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          title={translations.returnToHomeScreen}
          description={translations.doYouWantToReturnToHomeScreen}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this._goToHomeScreen()}
        />
      </Header>
    );
  }
}
