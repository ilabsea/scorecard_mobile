import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from 'react-native-whc-loading';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import MessageLabel from '../../components/MessageLabel';
import TextFieldInput from '../../components/TextFieldInput';
import SelectPicker from '../../components/SelectPicker';

import Color from '../../themes/color';
import validationService from '../../services/validation_service';
import {checkConnection} from '../../services/api_service';
import {handleApiResponse} from '../../services/api_service';
import authenticationFormService from '../../services/authentication_form_service';
import {localeDictionary} from '../../constants/locale_constant';
import contactService from '../../services/contact_service';
import internetConnectionService from '../../services/internet_connection_service';

import SessionApi from '../../api/SessionApi';

import pkg from '../../../package';

class Setting extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      backendUrl: 'https://isaf-stg.ilabsea.org',
      email: '',
      password: '',
      locales: [],
      locale: 'km',
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      errorMsg: '',
      messageType: '',
      isLoading: false,
      hasInternetConnection: false,
    };
    this.languageController;
  }

  componentDidMount = async () => {
    const { appLanguage } = this.context;
    let setting = { locales: this.getLocales(), locale: appLanguage };

    try {
      const value = await AsyncStorage.getItem('SETTING');

      if (value !== null) {
        setting = Object.assign(setting, JSON.parse(value))
      }
      setting.locale = appLanguage;

      this.setState(setting);
    } catch (error) {
      this.setState(setting);
    }

    internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });
  }

  getLocales = () => {
    const {translations} = this.context;
    let locales = translations.getAvailableLanguages();
    return locales.map((locale) => ({label: localeDictionary[locale], value: locale}));
  };

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = '';

    this.setState(state);
  }

  renderInputForm = () => {
    const {translations} = this.context;
    const {backendUrl, email, password, backendUrlErrorMsg, emailErrorMsg, passwordErrorMsg} = this.state;
    const backendUrlLabel = `${translations['backendUrl']} *`;
    const emailLabel = `${translations['email']} *`;
    const passwordLabel = `${translations['password']} *`;

    return (
      <View>
        <TextFieldInput
          value={backendUrl}
          label={backendUrlLabel}
          placeholder={translations["enterBackendUrl"]}
          fieldName="backendUrl"
          onChangeText={this.onChangeText}
          message={translations[backendUrlErrorMsg]}
          onFocus={() => this.languageController.close()}
        />

        <TextFieldInput
          value={email}
          label={emailLabel}
          placeholder={translations["enterEmail"]}
          fieldName="email"
          onChangeText={this.onChangeText}
          message={translations[emailErrorMsg]}
          onFocus={() => this.languageController.close()}
        />

        <TextFieldInput
          value={password}
          label={passwordLabel}
          placeholder={translations["enterPassword"]}
          fieldName="password"
          onChangeText={this.onChangeText}
          message={translations[passwordErrorMsg]}
          secureTextEntry={true}
          onFocus={() => this.languageController.close()}
        />
      </View>
    );
  };

  getPickerDefaultValue = (value) => {
    if (value != '' && value != undefined)
      return value.toString();

    return null;
  };

  changeLocale = (locale) => {
    const {setAppLanguage} = this.context;
    this.setState({locale: locale.value});
    setAppLanguage(locale.value);
  }

  renderChooseLanugage = () => {
    const {translations} = this.context;
    const {locales, locale} = this.state;

    return (
      <SelectPicker
        items={locales}
        selectedItem={locale}
        label={translations["language"]}
        placeholder={translations["selectLanguage"]}
        searchablePlaceholder={translations["searchForLanguage"]}
        zIndex={6000}
        showCustomArrow={true}
        onChangeItem={this.changeLocale}
        mustHasDefaultValue={true}
        controller={(instance) => this.languageController = instance}
        onOpen={() => Keyboard.dismiss()}
      />
    );
  };

  isValidForm = () => {
    const {backendUrl, email, password} = this.state;
    this.setState({
      errorMsg: '',
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
    });

    const backendUrlValidationMsg = validationService('backendUrl', backendUrl);
    const emailValidationMsg = validationService('email', email);
    const passwordValidationMsg = validationService('password', password);

    this.setState({
      backendUrlErrorMsg: backendUrlValidationMsg || '',
      emailErrorMsg: emailValidationMsg || '',
      passwordErrorMsg: passwordValidationMsg || '',
    });

    if (backendUrlValidationMsg != null || emailValidationMsg != null || passwordValidationMsg != null)
      return false;

    return true;
  }

  async authenticate() {
    const { backendUrl, email, password } = this.state;
    const response = await SessionApi.authenticate(email, password);

    handleApiResponse(response, (responseData) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      AsyncStorage.setItem('AUTH_TOKEN', responseData.authentication_token);

      authenticationFormService.clearErrorAuthentication();
      contactService.downloadContacts()

      this.refs.loading.show(false);
      this.setState({isLoading: false});
      this.props.navigation.goBack();
    }, (error) => {
      if (error.status == 422)
        authenticationFormService.setIsErrorAuthentication();

      AsyncStorage.setItem('IS_CONNECTED', 'true');
      AsyncStorage.removeItem('AUTH_TOKEN');

      this.refs.loading.show(false);
      this.setState({isLoading: false});
      this.handleAuthenticateError(response);
    });
  }

  save = async () => {
    const { translations } = this.context;

    if (!this.state.hasInternetConnection) {
      internetConnectionService.showAlertMessage(translations.noInternetConnection,);
      return;
    }

    if (!this.isValidForm()) {
      return;
    }

    AsyncStorage.setItem('ENDPOINT_URL', this.state.backendUrl);
    AsyncStorage.setItem('SETTING', JSON.stringify({
      backendUrl: this.state.backendUrl,
      email: this.state.email,
      password: this.state.password,
      locale: this.state.locale
    }));
    AsyncStorage.setItem('IS_CONNECTED', 'false');

    this.refs.loading.show();
    this.setState({isLoading: true});
    this.authenticate();

    checkConnection((type, message) => {
      const { translations } = this.context;

      this.setState({
        messageType: type,
        errorMsg: translations[message],
        isLoading: false,
      });

      this.refs.loading.show(false);
    });
  }

  handleAuthenticateError = (response) => {
    let message = '';
    if (response.error === undefined) {
      this.setState({errorMsg: 'authenticationFailed'});
      return;
    }

    this.setState({messageType: 'error'});
    const error = response.error;

    if (error.message.toLowerCase() === 'invalid email or password!')
      message = 'invalidEmailOrPasswordMsg';
    else if (error.message.toLowerCase() === 'Your account is unprocessable')
      message = 'accountIsUnprocessable';
    else
      message = 'authenticationFailed';

    this.setState({errorMsg: message});
  }

  renderErrorMsg = () => {
    const {translations} = this.context;
    const {errorMsg, messageType} = this.state;

    return (
      <MessageLabel
        message={translations[errorMsg]}
        type={messageType}
        customStyle={{marginTop: 120}}
      />
    );
  }

  onTouchWithoutFeedback = () => {
    Keyboard.dismiss();
    this.languageController.close();
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => this.onTouchWithoutFeedback()}>
        <View style={[styles.container]}>
          <Loading
            ref="loading"
            backgroundColor='#ffffffF2'
            borderRadius={5}
            size={70}
            imageSize={40}
            indicatorColor={Color.primaryColor}
          />
          {this.renderInputForm()}
          {this.renderChooseLanugage()}
          {this.renderErrorMsg()}
          <ActionButton
            label={translations['save']}
            onPress={() => this.save()}
            isDisabled={this.state.isLoading}
          />
          <Text style={{textAlign: 'center', marginTop: 10}}>{translations.version} { pkg.version }</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
  },
  inputLabel: {
    marginBottom: 10,
  },
  dropDownPickerStyle: {
    backgroundColor: 'white',
    zIndex: 5000,
    elevation: 2,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  }
});

export default Setting;
