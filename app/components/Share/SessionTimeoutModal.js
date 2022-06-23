import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { LocalizationContext } from '../Translations';
import CustomAlertMessage from './CustomAlertMessage';
import BoldLabel from './BoldLabel';
import ErrorAuthenticationMain from '../ErrorAuthentication/ErrorAuthenticationMain';

class SessionTimeoutModal extends React.Component {
  static contextType = LocalizationContext;

  render() {
    // {this.context.translations.invalidEmailOrPasswordForServer}: <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>.

    return (
      <CustomAlertMessage
        visible={this.props.visibleErrorModal}
        // title="Session expired"
        description="Please re-login your account"
        onDismiss={() => this.props.onErrorModalDismiss()}
      >
        <ErrorAuthenticationMain backendUrl={this.props.backendUrl} onDismiss={this.props.onDismiss} />
      </CustomAlertMessage>
    )
  }
}

export default SessionTimeoutModal;