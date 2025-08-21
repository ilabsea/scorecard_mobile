import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import ProgressStep from '../ProgressStep';
import CustomAlertMessage from './CustomAlertMessage';
import HeaderIconButton from './HeaderIconButton';
import NavigationHeaderBody from '../NavigationHeaderBody';

import { LocalizationContext } from '../Translations';
import { getDeviceStyle } from '../../utils/responsive_util';
import { navigateBack, navigateHome } from '../../utils/navigation_util';
import Color from '../../themes/color';

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
      <View style={{backgroundColor: Color.headerColor}}>
        <Appbar.Header style={{backgroundColor: Color.headerColor}}>
          <Appbar.BackAction onPress={() => navigateBack()} color='white' />
          <NavigationHeaderBody title={this.props.title} />

          <View style={{flexDirection: 'row'}}>
            { !!this.props.rightButton && this.props.rightButton }

            <HeaderIconButton onPress={() => this.setState({ visibleModal: true })} icon='home' iconStyle={{color: Color.whiteColor}} />
          </View>
        </Appbar.Header>
        <View style={{width: '100%'}}>
          <View style={{marginTop: getDeviceStyle(10, 4), alignSelf: 'center'}}>
            <ProgressStep
              steps={!!this.props.steps && this.props.steps}
              progressIndex={this.props.progressIndex || 0}/>
          </View>
        </View>

        <CustomAlertMessage
          visible={this.state.visibleModal}
          title={translations.returnToHomeScreen}
          description={translations.doYouWantToReturnToHomeScreen}
          closeButtonLabel={translations.close}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          isConfirmButtonDisabled={false}
          onDismiss={() => this.setState({visibleModal: false})}
          onConfirm={() => this._goToHomeScreen()}
        />
      </View>
    );
  }
}
