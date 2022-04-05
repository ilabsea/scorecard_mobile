import React from 'react';
import { ScrollView, Pressable } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../../components/Translations';
import SettingForm from './SettingForm';
import SettingBottomSection from './SettingBottomSection';

import { FAILED_SIGN_IN_ATTEMPT } from '../../constants/lock_device_constant';
import Color from '../../themes/color';
import { navigationRef } from '../../navigators/app_navigator';
import settingHelper from '../../helpers/setting_helper';

import {checkConnection} from '../../services/api_service';
import authenticationService from '../../services/authentication_service';
import authenticationFormService from '../../services/authentication_form_service';
import lockDeviceService from '../../services/lock_device_service';
import resetLockService from '../../services/reset_lock_service';
import internetConnectionService from '../../services/internet_connection_service';

import { getDeviceStyle } from '../../utils/responsive_util';
import SettingStyleTabletStyles from '../../styles/tablet/SettingScreenStyle';
import SettingStyleMobileStyles from '../../styles/mobile/SettingScreenStyle';

const responsiveStyles = getDeviceStyle(SettingStyleTabletStyles, SettingStyleMobileStyles);

class SettingBodyContent extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isLocked: false,
      isValid: false,
      unlockAt: '',
      errorMsg: '',
      messageType: '',
      visibleModal: false,
    }

    this.settingFormRef = React.createRef();
    this.componentIsUnmount = false;
  }

  componentDidMount = async () => {
    if (await lockDeviceService.hasFailAttempt(FAILED_SIGN_IN_ATTEMPT) && !this.resetLockInterval)
      this.watchLockStatus();
  }

  componentWillUnmount() {
    clearInterval(this.resetLockInterval);
    this.componentIsUnmount = true;
  }

  watchLockStatus() {
    setTimeout(async () => {
      if (!this.componentIsUnmount)
        this.setState({ unlockAt: await lockDeviceService.unlockAt(FAILED_SIGN_IN_ATTEMPT) });
    }, 300);

    this.resetLockInterval = resetLockService.watchLockStatus(FAILED_SIGN_IN_ATTEMPT, async () => {
      clearInterval(this.resetLockInterval);
      this.resetLockInterval = null;
      if (!this.componentIsUnmount)
        this.setState({
          isLocked: false,
          isValid: await this.isFormValid(),
          errorMsg: '',
          messageType: '',
        });
    });
  }

  clearErrorMessage() {
    this.settingFormRef.current.setState({
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
    });
    this.setState({ errorMsg: '' });
  }

  async isFormValid() {
    const { backendUrl, email, password } = this.settingFormRef.current.state;
    return await authenticationFormService.isValidSettingForm(backendUrl, email, password);
  }

  authenticate() {
    const { email, password } = this.settingFormRef.current.state;

    authenticationService.authenticate(email, password, () => {
      this.setState({ isLoading: false });
      navigationRef.current?.goBack();
    }, async (errorMessage, isLocked, isInvalidAccount) => {
      this.setState({
        isLoading: false,
        errorMsg: errorMessage,
        messageType: 'error',
        isLocked: isLocked,
        unlockAt: await lockDeviceService.unlockAt(FAILED_SIGN_IN_ATTEMPT)
      });

      if (!this.resetLockInterval && isInvalidAccount)
        this.watchLockStatus();
    });
  }

  save = async () => {
    const { translations } = this.context;

    if (!this.props.hasInternetConnection) {
      internetConnectionService.showAlertMessage(translations.noInternetConnection);
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

    authenticationService.saveSignInInfo(this.settingFormRef.current.state);
    AsyncStorage.setItem('IS_CONNECTED', 'false');
    this.setState({isLoading: true});
    this.authenticate();

    checkConnection((type, message) => {
      if (!this.componentIsUnmount) {
        this.setState({
          messageType: type,
          errorMsg: translations[message],
          isLoading: false,
        });
      }
    });
  }

  renderBottomSection() {
    return <SettingBottomSection
              unlockAt={this.state.unlockAt}
              isValid={this.state.isValid}
              isLoading={this.state.isLoading}
              isLocked={this.state.isLocked}
              messageType={this.state.messageType}
              errorMsg={this.state.errorMsg}
              visibleModal={this.state.visibleModal}
              save={() => this.save()}
              dismissModal={() => this.setState({ visibleModal: false })}
           />
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Color.whiteColor }}>
        <Pressable style={responsiveStyles.container}>
          <Spinner
            visible={this.state.isLoading}
            color={Color.primaryColor}
            overlayColor={Color.loadingBackgroundColor}
          />

          <SettingForm
            ref={this.settingFormRef}
            proposedIndicatorMethod={this.props.proposedIndicatorMethod}
            updateValidationStatus={async () => this.setState({ isValid: await this.isFormValid(), isLocked: await lockDeviceService.isLocked(FAILED_SIGN_IN_ATTEMPT) })}
            formRef={this.props.formRef}
            formModalRef={this.props.formModalRef}
          />

          { this.renderBottomSection() }
        </Pressable>
      </ScrollView>
    )
  }
}

export default SettingBodyContent;