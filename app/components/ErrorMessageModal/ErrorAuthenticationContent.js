import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import CustomStyle from '../../themes/customStyle';
import { LocalizationContext } from '../Translations';
import TextFieldInput from '../TextFieldInput';
import authenticationService from '../../services/authentication_service';
import authenticationFormService from '../../services/authentication_form_service';

import ModalConfirmationButtons from '../ModalConfirmationButtons';

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

  render() {
    const { translations } = this.context;
    const emailLabel = `${translations['email']} *`;
    const passwordLabel = `${translations['password']} *`;

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Text style={CustomStyle.modalTitle}>{translations.serverRequiresAuthentication}</Text>
          <Text style={{marginTop: 10, marginBottom: 15}}>
            {translations.invalidEmailOrPasswordForServer}: <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>.
          </Text>

          <TextFieldInput
            value={this.state.email}
            label={emailLabel}
            placeholder={translations.enterEmail}
            fieldName="email"
            onChangeText={this.onChangeText}
            message={translations.emailErrorMsg}
          />

          <TextFieldInput
            value={this.state.password}
            label={passwordLabel}
            placeholder={translations.enterPassword}
            fieldName="password"
            onChangeText={this.onChangeText}
            message={translations.passwordErrorMsg}
            secureTextEntry={true}
          />

          { this.state.message != '' &&
            <Text style={{ textAlign: 'center', color: this.state.isError ? 'red' : 'green'}}>
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