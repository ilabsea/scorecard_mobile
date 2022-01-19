import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import TextFieldInput from '../TextFieldInput';
import OutlineInfoIcon from '../OutlineInfoIcon';
import authenticationFormService from '../../services/authentication_form_service';
import authenticationService from '../../services/authentication_service';
import lockDeviceService from '../../services/lock_device_service';
import resetLockService from '../../services/reset_lock_service';
import { FAILED_SIGN_IN_ATTEMPT } from '../../constants/lock_device_constant';

import ModalConfirmationButtons from '../ModalConfirmationButtons';

import { pressableItemSize } from '../../utils/component_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorAuthenticationContent extends Component {
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
      showPasswordIcon: 'eye',
      isLocked: false,
    };
  }

  async componentDidMount() {
    if (await lockDeviceService.hasFailAttempt(FAILED_SIGN_IN_ATTEMPT) && !this.resetLockInterval)
      this.watchLockStatus();
  }

  componentWillUnmount() {
    clearInterval(this.resetLockInterval);
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = '';
    state['message'] = '';

    this.setState(state, () => {
      this.setState({
        isValidForm: authenticationFormService.isValidForm(this.state.email, this.state.password)
      })
    });
  }

  watchLockStatus() {
    this.resetLockInterval = resetLockService.watchLockStatus(FAILED_SIGN_IN_ATTEMPT, async () => {
      clearInterval(this.resetLockInterval);
      this.resetLockInterval = null;
      this.setState({
        isLocked: false,
        isValid: authenticationFormService.isValidForm(this.state.email, this.state.password),
        message: '',
      });
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
      });

      if (!this.resetLockInterval && isInvalidAccount)
        this.watchLockStatus();
    });
  }

  _renderShowPasswordIcon = () => {
    const buttonPadding = 2;

    return (
      <TextInput.Icon
        name={this.state.showPasswordIcon}
        color="#959595"
        onPress={() => this.setState({ showPasswordIcon: this.state.showPasswordIcon == 'eye' ? 'eye-off' : 'eye' })}
        accessibilityLabel='Toggle password visibility'
        style={{height: pressableItemSize(buttonPadding), width: pressableItemSize(buttonPadding)}}
      />
    )
  }

  render() {
    const { translations } = this.context;
    const emailLabel = `${translations['email']} *`;
    const passwordLabel = `${translations['password']} *`;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{borderWidth: 0, margin: 0}}>
          <View style={{flexDirection: 'row'}}>
            <OutlineInfoIcon color={Color.warningColor} />

            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{marginTop: 0, flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={[{ marginBottom: 15 }, responsiveStyles.label]}>
                  {translations.invalidEmailOrPasswordForServer}: <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>.
                </Text>
              </View>
            </View>
          </View>

          <TextFieldInput
            value={this.state.email}
            label={emailLabel}
            placeholder={translations.enterEmail}
            fieldName="email"
            onChangeText={this.onChangeText}
            message={translations.emailErrorMsg}
            keyboardType='email-address'
          />

          <TextFieldInput
            value={this.state.password}
            label={passwordLabel}
            placeholder={translations.enterPassword}
            fieldName="password"
            onChangeText={this.onChangeText}
            message={translations.passwordErrorMsg}
            secureTextEntry={this.state.showPasswordIcon == 'eye' ? true : false}
            right={this._renderShowPasswordIcon()}
          />

          { this.state.message != '' &&
            <Text style={[{ textAlign: 'center', marginTop: -10, color: this.state.isError ? 'red' : 'green'}, responsiveStyles.label]}>
              {this.state.message}
            </Text>
          }

          <ModalConfirmationButtons
            onClose={this.props.onDismiss}
            closeButtonLabel={translations.close}
            onConfirm={() => this.save()}
            confirmButtonLabel={translations.save}
            isConfirmButtonDisabled={!this.state.isValidForm || this.state.isLoading || this.state.isLocked}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ErrorAuthenticationContent;