import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../Translations';
import CustomAlertMessage from './CustomAlertMessage';
import CustomAlertMessageBigButton from './CustomAlertMessage/CustomAlertMessageBigButton';

import { getAlertMessageObject } from '../../utils/alert_message_util';
import { ERROR_AUTHENTICATION, RE_LOGIN_REQUIRED } from '../../constants/error_constant';
import { environment } from '../../config/environment';
import { navigate } from '../../navigators/app_navigator';

class ErrorAlertMessage extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      alertMessage: {},
    }

    AsyncStorage.getItem('SETTING', (err, result) => {
      const savedSetting = JSON.parse(result);
      this.backendUrl = (!!savedSetting && !!savedSetting.backendUrl) ? savedSetting.backendUrl : environment.defaultEndpoint;
    });
  }

  async componentDidUpdate(prevProps) {
    const { translations, appLanguage } = this.context;
    const localization = {
      translations,
      app_language: appLanguage
    }

    if (this.props.visible && this.props.visible != prevProps.visible) {
      const { errorType, scorecardUuid, unlockAt } = this.props;
      this.setState({
        alertMessage: await getAlertMessageObject(errorType, scorecardUuid, unlockAt, localization),
      })
    }
  }

  goToSetting() {
    this.props.onDismiss();
    navigate('Setting', { backend_url: this.backendUrl });
  }

  bigButton() {
    if (this.props.errorType === RE_LOGIN_REQUIRED || this.props.errorType == ERROR_AUTHENTICATION)
      return <CustomAlertMessageBigButton
                label={this.context.translations.goToSetting}
                onPress={() => this.goToSetting()}
             />
  }

  render() {
    const { translations } = this.context;

    return <CustomAlertMessage
              visible={this.props.visible}
              title={!!this.state.alertMessage ? this.state.alertMessage.title : ''}
              description={!!this.state.alertMessage ? this.state.alertMessage.description : ''}
              closeButtonLabel={ this.props.hasConfirmButton ? translations.close : translations.infoCloseLabel }
              hasConfirmButton={this.props.hasConfirmButton}
              confirmButtonLabel={this.props.confirmButtonLabel}
              isConfirmButtonDisabled={this.props.isConfirmButtonDisabled}
              onDismiss={() => this.props.onDismiss(true)}
              onConfirm={() => this.props.onConfirm()}
              customButton={this.bigButton()}
           />
  }
}

export default ErrorAlertMessage;

// How to use ErrorAlertMessage
{/* <ErrorAlertMessage
  visible={boolean}
  errorType={string}
  scorecardUuid={string}
  onDismiss={function()}
/> */}