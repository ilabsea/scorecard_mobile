import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../Translations';
import ErrorMessageContent from '../ErrorMessageModal/ErrorMessageContent';
import { ERROR_AUTHENTICATION } from '../../constants/error_constant';
import { environment } from '../../config/environment';
import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { getErrorMessageContent } from '../../utils/modal_error_message_util';
import ErrorMessageModalTabletStyles from '../../styles/tablet/ErrorMessageModalComponentStyle';
import ErrorMessageModalMobileStyles from '../../styles/mobile/ErrorMessageModalComponentStyle';

const responsiveStyles = getDeviceStyle(ErrorMessageModalTabletStyles, ErrorMessageModalMobileStyles);

class ErrorMessageModal extends Component {
  static contextType = LocalizationContext;
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
      backendUrl: setting != null ? JSON.parse(setting).backendUrl : environment.defaultEndpoint,
    }, () => {
      AsyncStorage.setItem('ENDPOINT_URL', this.state.backendUrl);
    });
  }

  _renderContent = () => {
    if (!!this.props.unlockAt) {
      const { translations } = this.context;
      return <ErrorMessageContent
              onDismiss={this.props.onDismiss}
              message={ translations.formatString(translations.yourDeviceIsCurrentlyLocked, this.props.unlockAt) }
            />
    }

    const params = {
      error_type: this.props.errorType,
      is_new_scorecard: this.props.isNewScorecard,
      is_submit: this.props.isSubmit,
      scorecard_uuid: this.props.scorecardUuid,
      backend_url: this.state.backendUrl,
    };

    return getErrorMessageContent(params, this.props.onDismiss);
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