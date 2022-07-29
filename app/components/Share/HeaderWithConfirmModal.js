import React from 'react';
import { Keyboard } from 'react-native';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import CustomAlertMessage from './CustomAlertMessage';

class HeaderWithConfirmModal extends React.Component {
  static contextType = LocalizationContext;
  onBackPress() {
    Keyboard.dismiss();
    !!this.props.onBackPress && this.props.onBackPress();
  }

  render() {
    const { translations } = this.context;

    return (
      <React.Fragment>
        <NavigationHeader
          title={ this.props.title }
          onBackPress={() => this.onBackPress()}
          rightButtonStyle={{marginRight: 6}}
        />

        <CustomAlertMessage
          visible={this.props.visibleConfirmModal}
          title={this.props.modalTitle}
          description={this.props.modalDescription}
          closeButtonLabel={translations.buttonLabelNo}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          isConfirmButtonDisabled={false}
          onDismiss={() => this.props.onDismiss()}
          onConfirm={() => this.props.goBack()}
        />
      </React.Fragment>
    )
  }
}

export default HeaderWithConfirmModal;