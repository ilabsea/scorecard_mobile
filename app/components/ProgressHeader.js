import React, {Component} from 'react';
import { View } from 'react-native';

import {
  Header,
  Title,
  Left,
  Body,
} from "native-base";

import { HeaderBackButton } from '@react-navigation/stack';
import ProgressStep from '../components/ProgressStep';
import MessageModal from './MessageModal';
import HeaderIconButton from './HeaderIconButton';
import { LocalizationContext } from './Translations';
import { getDeviceStyle, mobileHeadingTitleSize } from '../utils/responsive_util';

import Color from '../themes/color';

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
            <HeaderBackButton tintColor={Color.whiteColor} onPress={() => this._onPress()} style={{ marginLeft: getDeviceStyle(11, 0) }} />
          </Left>

          <Body>
            <Title style={{fontSize: getDeviceStyle(19, mobileHeadingTitleSize())}}>{this.props.title}</Title>
          </Body>

          <View>
            <HeaderIconButton onPress={() => this.setState({ visibleModal: true })} icon='home' />
          </View>
        </View>

        <View style={{width: '100%'}}>
          <View style={{marginTop: getDeviceStyle(10, 4), alignSelf: 'center'}}>
            <ProgressStep
              steps={!!this.props.steps && this.props.steps}
              progressIndex={this.props.progressIndex || 0}/>
          </View>
        </View>

        <MessageModal
          visible={this.state.visibleModal}
          onDismiss={() => this.setState({visibleModal: false})}
          description={translations.doYouWantToReturnToHomeScreen}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          onPressConfirmButton={() => this._goToHomeScreen()}
        />
      </Header>
    );
  }
}
