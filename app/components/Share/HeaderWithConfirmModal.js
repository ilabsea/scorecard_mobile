import React from 'react';
import { Keyboard } from 'react-native';

import { LocalizationContext } from '../Translations';
import NavigationHeader from '../NavigationHeader';
import MessageModal from '../MessageModal';

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

        <MessageModal
          visible={this.props.visibleConfirmModal}
          onDismiss={() => this.props.onDismiss()}
          description={this.props.modalDescription}
          hasConfirmButton={true}
          confirmButtonLabel={translations.ok}
          closeButtonLabel={translations.infoCloseLabel}
          onPressConfirmButton={() => this.props.goBack()}
        />
      </React.Fragment>
    )
  }
}

export default HeaderWithConfirmModal;