import React, { Component } from 'react';
import {BackHandler, TouchableWithoutFeedback, View} from 'react-native';
import { Appbar } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import NavigationHeaderBody from '../NavigationHeaderBody'
import ConfirmationBottomSheetContent from '../Share/ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';
import { navigationRef } from '../../navigators/app_navigator';
import Color from '../../themes/color';

class ProposeNewIndicatorNavHeader extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.backHandler = null;
    this.confirmationModalRef = React.createRef();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.props.bottomSheetRef.current?.isOpen())
        this.props.formModalRef.current?.dismiss()
      else
        this.onBackPress()

      return true;
    })
  }

  componentWillUnmount() {
    !!this.backHandler && this.backHandler.remove()
  }

  confirmGoBack() {
    !!this.props.handleUnconfirmedIndicator && this.props.handleUnconfirmedIndicator();
    setTimeout(() => {
      navigationRef.current?.goBack();
    }, 500)
  }

  onBackPress = () => {
    if (this.props.searchBoxRef.current?.state.showResult)
      return this.props.searchBoxRef.current?.closeSearch()

    const { translations } = this.context;
    this.confirmationModalRef.current?.setContent(
      <ConfirmationBottomSheetContent
        title={translations.discardTheChanges}
        confirmationMessage={translations.areYouSureYouWantToDiscardTheseNewProposedIndicator}
        onPress={() => {
          this.confirmationModalRef.current?.dismiss();
          this.confirmGoBack()
        }}
      />
    );
    this.confirmationModalRef.current?.present();
  }

  render() {
    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={() => this.props.searchBoxRef.current?.closeSearch()}>
          <Appbar.Header style={{backgroundColor: Color.headerColor}}>
            <Appbar.BackAction onPress={() => this.onBackPress()} color='white' />
            <NavigationHeaderBody title={this.context.translations.proposeNewIndicatorTitle} />
            { this.props.isSearching && <View style={{ height: 64, width: '110%', position: 'absolute', top: 0, zIndex: 1, backgroundColor: 'white', opacity: 0.8 }}/> }
          </Appbar.Header>
        </TouchableWithoutFeedback>

        <DynamicHeightBottomSheetModal ref={this.confirmationModalRef} />
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorNavHeader