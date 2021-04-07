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
import Spinner from 'react-native-loading-spinner-overlay';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import MessageLabel from '../../components/MessageLabel';
import SettingForm from '../../components/Setting/SettingForm';
import MessageModal from '../../components/MessageModal';

import Color from '../../themes/color';
import validationService from '../../services/validation_service';
import {checkConnection} from '../../services/api_service';
import {handleApiResponse} from '../../services/api_service';
import authenticationFormService from '../../services/authentication_form_service';
import contactService from '../../services/contact_service';
import internetConnectionService from '../../services/internet_connection_service';
import settingHelper from '../../helpers/setting_helper';

import SessionApi from '../../api/SessionApi';

import pkg from '../../../package';

import { getDeviceStyle } from '../../utils/responsive_util';
import SettingStyleTabletStyles from './styles/tablet/SettingStyle';
import SettingStyleMobileStyles from './styles/mobile/SettingStyle';

const responsiveStyles = getDeviceStyle(SettingStyleTabletStyles, SettingStyleMobileStyles);

class Setting extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      messageType: '',
      isLoading: false,
      hasInternetConnection: false,
      visibleModal: false,
    };

    this.settingFormRef = React.createRef();
  }

  componentDidMount = async () => {
    internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });
  }

  getPickerDefaultValue = (value) => {
    if (value != '' && value != undefined)
      return value.toString();

    return null;
  };

  isValidForm = () => {
    const {backendUrl, email, password} = this.settingFormRef.current.state;
    this.settingFormRef.current.setState({
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
    });

    this.setState({ errorMsg: '' });

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
    const { email, password } = this.settingFormRef.current.state;
    const response = await SessionApi.authenticate(email, password);

    handleApiResponse(response, (responseData) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      AsyncStorage.setItem('AUTH_TOKEN', responseData.authentication_token);
      AsyncStorage.setItem('TOKEN_EXPIRED_DATE', responseData.token_expired_date);

      authenticationFormService.clearErrorAuthentication();
      contactService.downloadContacts()

      this.setState({isLoading: false});
      this.props.navigation.goBack();
    }, (error) => {
      if (error.status == 422)
        authenticationFormService.setIsErrorAuthentication();

      AsyncStorage.setItem('IS_CONNECTED', 'true');
      AsyncStorage.removeItem('AUTH_TOKEN');

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

    const changeableSetting = await settingHelper.changeable(this.settingFormRef.current.state.backendUrl)

    if (!changeableSetting) {
      this.setState({ visibleModal: true });
      return;
    }

    if (!this.isValidForm()) {
      return;
    }

    const { backendUrl, email, password, locale } = this.settingFormRef.current.state;

    AsyncStorage.setItem('ENDPOINT_URL', backendUrl);
    AsyncStorage.setItem('SETTING', JSON.stringify({
      backendUrl: backendUrl,
      email: email,
      password: password,
      locale: locale
    }));
    AsyncStorage.setItem('IS_CONNECTED', 'false');

    this.setState({isLoading: true});
    this.authenticate();

    checkConnection((type, message) => {
      const { translations } = this.context;

      this.setState({
        messageType: type,
        errorMsg: translations[message],
        isLoading: false,
      });
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
        customStyle={responsiveStyles.messageContainer}
      />
    );
  }

  onTouchWithoutFeedback = () => {
    Keyboard.dismiss();
    this.settingFormRef.current.closeDropDown();
  }

  goToScorecardList = () => {
    this.setState({ visibleModal: false });
    this.props.navigation.navigate('ScorecardList');
  }

  render() {
    const {translations} = this.context;

    return (
      <TouchableWithoutFeedback onPress={() => this.onTouchWithoutFeedback()}>
        <View style={[styles.container]}>
          <Spinner
            visible={this.state.isLoading}
            color={Color.primaryColor}
            overlayColor='rgba(90, 90, 90, 0.55)'
          />

          <SettingForm
            ref={this.settingFormRef}
          />

          {this.renderErrorMsg()}
          <ActionButton
            label={translations['save']}
            onPress={() => this.save()}
            isDisabled={this.state.isLoading}
            customLabelStyle={responsiveStyles.textLabel}
          />
          <Text style={[{textAlign: 'center', marginTop: 10}, responsiveStyles.textLabel]}>{translations.version} { pkg.version }</Text>

          <MessageModal
            visible={this.state.visibleModal}
            onDismiss={() => this.setState({visibleModal: false})}
            title={translations.notice}
            description={translations.scorecardRemainingMessage}
            hasConfirmButton={true}
            confirmButtonLabel={translations.viewDetail}
            onPressConfirmButton={() => this.goToScorecardList()}
          />
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
