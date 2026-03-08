import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

import ProgressStep from '../ProgressStep';
import HeaderIconButton from './HeaderIconButton';
import NavigationHeaderBody from '../NavigationHeaderBody';
import ConfirmationBottomSheetContent from './ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';

import { LocalizationContext } from '../Translations';
import { getDeviceStyle } from '../../utils/responsive_util';
import { navigateBack, navigateHome } from '../../utils/navigation_util';
import Color from '../../themes/color';

export default class BigHeader extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.confirmationModalRef = React.createRef();
  }

  _goToHomeScreen() {
    this.confirmationModalRef.current?.dismiss();
    navigateHome();
  }

  showConfirmationBottomSheet() {
    const { translations } = this.context;

    this.confirmationModalRef.current?.setContent(
      <ConfirmationBottomSheetContent
        title={translations.returnToHomeScreen}
        confirmationMessage={translations.doYouWantToReturnToHomeScreen}
        onPress={() => this._goToHomeScreen()}
      />
    );
    this.confirmationModalRef.current?.present();
  }

  render() {
    return (
      <View style={{backgroundColor: Color.headerColor}}>
        <Appbar.Header style={{backgroundColor: Color.headerColor}}>
          <Appbar.BackAction onPress={() => navigateBack()} color='white' />
          <NavigationHeaderBody title={this.props.title} />

          <View style={{flexDirection: 'row'}}>
            { !!this.props.rightButton && this.props.rightButton }

            <HeaderIconButton onPress={() => this.showConfirmationBottomSheet()} icon='home' iconStyle={{color: Color.whiteColor}} />
          </View>
        </Appbar.Header>
        <View style={{width: '100%'}}>
          <View style={{marginTop: getDeviceStyle(10, 4), alignSelf: 'center'}}>
            <ProgressStep
              steps={!!this.props.steps && this.props.steps}
              progressIndex={this.props.progressIndex || 0}/>
          </View>
        </View>

        <DynamicHeightBottomSheetModal ref={this.confirmationModalRef} />
      </View>
    );
  }
}
