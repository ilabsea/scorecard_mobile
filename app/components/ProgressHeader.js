import React, {Component} from 'react';
import { View } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { Header, Left, Right } from "native-base";

import { HeaderBackButton } from '@react-navigation/stack';
import ProgressStep from '../components/ProgressStep';
import MessageModal from './MessageModal';
import HeaderIconButton from './HeaderIconButton';
import NavigationHeaderBody from './NavigationHeaderBody';

import { LocalizationContext } from './Translations';
import { getDeviceStyle, navigationBackButtonFlex } from '../utils/responsive_util';
import { navigateBack, navigateHome } from '../utils/navigation_util';

import Color from '../themes/color';
import { FontFamily } from '../assets/stylesheets/theme/font';

export default class BigHeader extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      visibleModal: false,
    };
  }

  _goToHomeScreen() {
    this.setState({ visibleModal: false });
    navigateHome();
  }

  render() {
    const { translations } = this.context;

    return (
      <Header span>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
          <Left style={{flex: navigationBackButtonFlex}}>
            <HeaderBackButton tintColor={Color.whiteColor} onPress={() => navigateBack()} style={{ marginLeft: 0 }} />
          </Left>

          <NavigationHeaderBody title={this.props.title} />

          <Right style={{maxWidth: wp('14%'), marginRight: getDeviceStyle(-19, -6)}}>
            { !!this.props.rightButton && this.props.rightButton }

            <HeaderIconButton onPress={() => this.setState({ visibleModal: true })} icon='home' />
          </Right>
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
