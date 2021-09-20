import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import ErrorRequestToServerContent  from './ErrorRequestToServerContent';
import ErrorAuthenticationContent from './ErrorAuthenticationContent';
import ErrorMessageContent from './ErrorMessageContent';
import {
  ERROR_AUTHENTICATION,
  ERROR_ENDPOINT,
  ERROR_NOT_FOUND,
  ERROR_UNAUTHORIZED,
} from '../../constants/error_constant';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import ErrorMessageModalTabletStyles from '../../styles/tablet/ErrorMessageModalComponentStyle';
import ErrorMessageModalMobileStyles from '../../styles/mobile/ErrorMessageModalComponentStyle';

const responsiveStyles = getDeviceStyle(ErrorMessageModalTabletStyles, ErrorMessageModalMobileStyles);

class ErrorMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backendUrl: '',
      isVisible: props.visible
    };
  }

  async componentDidMount() {
    const setting = await AsyncStorage.getItem('SETTING');
    this.setState({
      backendUrl: setting != null ? JSON.parse(setting).backendUrl : 'https://isaf.digital-csc.org',
    }, () => {
      AsyncStorage.setItem('ENDPOINT_URL', this.state.backendUrl);
    });
  }

  _renderContent = () => {
    if (this.props.errorType === ERROR_AUTHENTICATION)
      return <ErrorAuthenticationContent backendUrl={this.state.backendUrl} onDismiss={this.props.onDismiss} />
    else if (this.props.errorType === ERROR_ENDPOINT ||
      (this.props.errorType == ERROR_NOT_FOUND && !this.props.isNewScorecard) ||
      this.props.errorType === ERROR_UNAUTHORIZED) {
      return <ErrorRequestToServerContent
                backendUrl={this.state.backendUrl}
                onDismiss={this.props.onDismiss}
                isSubmit={this.props.isSubmit}
                errorType={this.props.errorType}
                scorecardUuid={this.props.scorecardUuid}
              />;
    }

    return <ErrorMessageContent 
              onDismiss={this.props.onDismiss}
              scorecardUuid={this.props.scorecardUuid}
              errorType={this.props.errorType}
            />
  }

  onModalDismiss = () => {
    if (this.props.errorType === ERROR_AUTHENTICATION)
      return false;

    return this.props.onDismiss;
  }

  render() {
    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={this.onModalDismiss()} contentContainerStyle={[styles.container, responsiveStyles.container]}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {this._renderContent()}
          </TouchableWithoutFeedback>
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
});

export default ErrorMessageModal;