import React from 'react';
import { Keyboard } from 'react-native';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import ConfirmationBottomSheetContent from './ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';

class HeaderWithConfirmModal extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.confirmationModalRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.visibleConfirmModal != this.props.visibleConfirmModal) && !!this.props.visibleConfirmModal) {
      this.confirmationModalRef.current?.setContent(
        <ConfirmationBottomSheetContent
          title={this.props.modalTitle}
          confirmationMessage={this.props.modalDescription}
          onPress={() => {
            this.confirmationModalRef.current?.dismiss();
            this.props.goBack();
          }}
        />
      );
      this.confirmationModalRef.current?.present();
    }
  }

  onBackPress() {
    Keyboard.dismiss();
    !!this.props.onBackPress && this.props.onBackPress();
  }

  render() {
    return (
      <React.Fragment>
        <NavigationHeader
          title={ this.props.title }
          onBackPress={() => this.onBackPress()}
          rightButtonStyle={{marginRight: 6}}
          hideRightComponent={this.props.hideRightComponent}
        >
          { this.props.children }
        </NavigationHeader>

        <DynamicHeightBottomSheetModal ref={this.confirmationModalRef} />
      </React.Fragment>
    )
  }
}

export default HeaderWithConfirmModal;