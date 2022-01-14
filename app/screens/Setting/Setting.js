import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import MessageLabel from '../../components/MessageLabel';
import SettingForm from '../../components/Setting/SettingForm';
import LockSignInMessage from '../../components/Setting/LockSignInMessage';
import MessageModal from '../../components/MessageModal';

import Color from '../../themes/color';
import {checkConnection} from '../../services/api_service';
import internetConnectionService from '../../services/internet_connection_service';
import authenticationService from '../../services/authentication_service';
// import signInService from '../../services/sign_in_service';
import authenticationFormService from '../../services/authentication_form_service';
import lockSignInService from '../../services/lock_sign_in_service';

import settingHelper from '../../helpers/setting_helper';

import pkg from '../../../package';

import { getDeviceStyle } from '../../utils/responsive_util';
import SettingStyleTabletStyles from '../../styles/tablet/SettingScreenStyle';
import SettingStyleMobileStyles from '../../styles/mobile/SettingScreenStyle';

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
      isLocked: false,
      isValid: false,
    };

    this.settingFormRef = React.createRef();
    this.unsubscribeNetInfo;
    this.componentIsUnmount = false;
  }

  componentDidMount = async () => {
    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });
  }

  componentWillUnmount() {
    this.componentIsUnmount = true;
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

  clearErrorMessage() {
    this.settingFormRef.current.setState({
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
    });
    this.setState({ errorMsg: '' });
  }

  authenticate() {
    const { email, password } = this.settingFormRef.current.state;

    authenticationService.authenticate(email, password, () => {
      this.setState({ isLoading: false });
      this.props.navigation.goBack();
    }, (errorMessage, isLocked) => {
      this.setState({
        isLoading: false,
        errorMsg: errorMessage,
        messageType: 'error',
        isLocked: isLocked,
      });
    });
    // signInService.authenticate(email, password, () => {
    //   this.setState({ isLoading: false });
    //   this.props.navigation.goBack();
    // }, (errorMessage) => {
    //   this.setState({
    //     isLoading: false,
    //     errorMsg: errorMessage,
    //     messageType: 'error',
    //   });
    // });
  }

  async isFormValid() {
    const { backendUrl, email, password } = this.settingFormRef.current.state;
    return await authenticationFormService.isValidSettingForm(backendUrl, email, password);
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

    this.clearErrorMessage();
    if (!await this.isFormValid())
      return;

    // signInService.saveSignInInfo(this.settingFormRef.current.state);
    authenticationService.saveSignInInfo(this.settingFormRef.current.state);
    AsyncStorage.setItem('IS_CONNECTED', 'false');
    this.setState({isLoading: true});
    this.authenticate();

    checkConnection((type, message) => {
      if (!this.componentIsUnmount) {
        const { translations } = this.context;
        this.setState({
          messageType: type,
          errorMsg: translations[message],
          isLoading: false,
        });
      }
    });
  }

  renderErrorMsg = () => {
    if (this.state.isLocked)
      return <LockSignInMessage />

    return (
      <MessageLabel
        message={this.context.translations[this.state.errorMsg]}
        type={this.state.messageType}
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
        <View style={[responsiveStyles.container]}>
          <Spinner
            visible={this.state.isLoading}
            color={Color.primaryColor}
            overlayColor={Color.loadingBackgroundColor}
          />

          <SettingForm ref={this.settingFormRef} updateValidationStatus={async () => this.setState({ isValid: !await this.isFormValid(), isLocked: await lockSignInService.isLocked() })} />

          {this.renderErrorMsg()}
          <ActionButton
            label={translations['save']}
            onPress={() => this.save()}
            isDisabled={this.state.isLoading || this.state.isValid || this.state.isLocked}
            customLabelStyle={responsiveStyles.textLabel}
          />
          <Text style={[{textAlign: 'center', marginTop: 10}, responsiveStyles.textLabel]}>{translations.version} { pkg.version }</Text>

          <MessageModal
            visible={this.state.visibleModal}
            onDismiss={() => this.setState({visibleModal: false})}
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

export default Setting;