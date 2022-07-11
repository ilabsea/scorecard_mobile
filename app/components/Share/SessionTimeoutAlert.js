import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../Translations';
import CustomAlertMessage from './CustomAlertMessage';
import SessionTimeoutForm from './SessionTimeoutAlert/SessionTimeoutForm';

import authenticationFormService from '../../services/authentication_form_service';
import authenticationService from '../../services/authentication_service';
import lockDeviceService from '../../services/lock_device_service';
import resetLockService from '../../services/reset_lock_service';
import { FAILED_SIGN_IN_ATTEMPT } from '../../constants/lock_device_constant';
import { getDeviceStyle } from '../../utils/responsive_util';

class SessionTimeoutAlert extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      isLoading: false,
      isValidForm: false,
      message: '',
      isError: false,
      isLocked: false,
      unlockAt: '',
    };
    this.componentIsUnmount = false;
  }

  async componentDidMount() {
    if (await lockDeviceService.hasFailAttempt(FAILED_SIGN_IN_ATTEMPT) && !this.resetLockInterval)
      this.watchLockStatus();

    const unlockAt = await lockDeviceService.unlockAt(FAILED_SIGN_IN_ATTEMPT) || '';
    const isLocked = await lockDeviceService.isLocked(FAILED_SIGN_IN_ATTEMPT);
    this.setState({
      isLocked,
      message: !!isLocked ? this.context.translations.formatString(this.context.translations.yourDeviceIsCurrentlyLocked, unlockAt) : '',
      unlockAt,
    });
  }

  componentWillUnmount() {
    clearInterval(this.resetLockInterval);
    this.componentIsUnmount = true;
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = '';
    state['message'] = this.state.isLocked ? this.context.translations.formatString(this.context.translations.yourDeviceIsCurrentlyLocked, this.state.unlockAt) : '';

    this.setState(state, () => {
      this.setState({ isValidForm: this.state.isLocked ? false : authenticationFormService.isValidForm(this.state.email, this.state.password) });
    });
  }

  watchLockStatus() {
    this.resetLockInterval = resetLockService.watchLockStatus(FAILED_SIGN_IN_ATTEMPT, async () => {
      clearInterval(this.resetLockInterval);
      this.resetLockInterval = null;

      if (!this.componentIsUnmount) {
        this.setState({
          isLocked: false,
          isValidForm: authenticationFormService.isValidForm(this.state.email, this.state.password),
          message: '',
        });
      }
    });
  }

  save = async () => {
    const { translations, appLanguage }  = this.context;
    if (!this.state.isValidForm)
      return;

    this.setState({
      isLoading: true,
      message: translations.authenticating,
    });

    authenticationService.authenticate(this.state.email, this.state.password, async () => {
      this.setState({
        isLoading: false,
        message: translations.successfullyAuthenticated,
      });

      const signInInfo = {
        backendUrl: await AsyncStorage.getItem('ENDPOINT_URL'),
        email: this.state.email,
        password: this.state.password,
        locale: appLanguage,
      }
      authenticationService.saveSignInInfo(signInInfo);
      this.props.onDismiss();
    }, async (errorMessage, isLocked, isInvalidAccount) => {
      const unlockAt = await lockDeviceService.unlockAt(FAILED_SIGN_IN_ATTEMPT) || '';
      this.setState({
        isLoading: false,
        message: isLocked ? translations.formatString(translations.yourDeviceIsCurrentlyLocked, unlockAt) : translations.emailOrPasswordIsIncorrect,
        isLocked: isLocked,
        unlockAt,
      });

      if (!this.resetLockInterval && isInvalidAccount)
        this.watchLockStatus();
    });
  }

  renderBody() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{margin: 0, paddingBottom: getDeviceStyle(50, 70)}}>
          <SessionTimeoutForm
            email={this.state.email}
            password={this.state.password}
            onChangeText={this.onChangeText}
            message={this.state.message}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  onDismiss() {
    this.setState({
      email: '',
      password: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      isLoading: false,
      isValidForm: false,
      message: '',
      isError: false,
    });
    this.props.onDismiss();
  }

  render() {
    const { translations } = this.context;

    return <CustomAlertMessage
              visible={this.props.visible}
              title={ translations.yourSessionHasExpired }
              description={ translations.pleaseLoginAgain }
              closeButtonLabel={ translations.close }
              hasConfirmButton={true}
              confirmButtonLabel={translations.save}
              isConfirmButtonDisabled={!this.state.isValidForm || this.state.isLoading || this.state.isLocked}
              onDismiss={() => this.onDismiss()}
              onConfirm={() => this.save()}
           >
              { this.renderBody() }
           </CustomAlertMessage>
  }
}

export default SessionTimeoutAlert;