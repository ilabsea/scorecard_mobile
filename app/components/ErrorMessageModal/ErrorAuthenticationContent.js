import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput } from 'react-native-paper';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import TextFieldInput from '../TextFieldInput';
import OutlineInfoIcon from '../OutlineInfoIcon';
import authenticationService from '../../services/authentication_service';
import authenticationFormService from '../../services/authentication_form_service';

import ModalConfirmationButtons from '../ModalConfirmationButtons';

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
    };
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

  save = async () => {
    const { translations }  = this.context;
    if (!this.state.isValidForm)
      return;

    this.setState({
      isLoading: true,
      message: translations.authenticating,
    });

    authenticationService.authenticate(this.state.email, this.state.password, async (responseData) => {
      this.setState({
        isLoading: false,
        message: translations.successfullyAuthenticated,
      });
      const endPointUrl = await AsyncStorage.getItem('ENDPOINT_URL');
      authenticationFormService.clearErrorAuthentication();
      AsyncStorage.setItem('AUTH_TOKEN', responseData.authentication_token);

      AsyncStorage.setItem('SETTING',JSON.stringify({
        backendUrl: endPointUrl,
        email: this.state.email,
        password: this.state.password
      }));

      this.props.onDismiss();
    }, (error) => {
      authenticationFormService.setIsErrorAuthentication();
      AsyncStorage.removeItem('AUTH_TOKEN');
      this.setState({
        isLoading: false,
        message: translations.emailOrPasswordIsIncorrect,
      });
    })
  }

  _renderShowPasswordIcon = () => {
    return (
      <TextInput.Icon
        name={this.state.showPasswordIcon}
        color="#959595"
        onPress={() => this.setState({ showPasswordIcon: this.state.showPasswordIcon == 'eye' ? 'eye-off' : 'eye' })}
        accessibilityLabel='Toggle password visibility'
        style={{height: 50, width: 50}}
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
            isConfirmButtonDisabled={!this.state.isValidForm || this.state.isLoading}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ErrorAuthenticationContent;