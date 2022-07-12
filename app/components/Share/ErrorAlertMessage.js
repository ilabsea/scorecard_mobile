import React from 'react';

import { LocalizationContext } from '../Translations';
import CustomAlertMessage from './CustomAlertMessage';
import SessionTimeoutAlert from './SessionTimeoutAlert';
import ReLoginModalButton from './ReLoginModalButton';

import { getAlertMessageObject } from '../../utils/alert_message_util';
import { ERROR_AUTHENTICATION, RE_LOGIN_REQUIRED } from '../../constants/error_constant';

class ErrorAlertMessage extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      alertMessage: {},
    }
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

  renderSessionTimeoutAlert() {
    return <SessionTimeoutAlert visible={this.props.visible} onDismiss={this.props.onDismiss} />
  }

  reLoginButton() {
    if (this.props.errorType === RE_LOGIN_REQUIRED)
      return <ReLoginModalButton  onDismiss={() => this.props.onDismiss()}/>
  }

  renderErrorActionAlert() {
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
              customButton={this.reLoginButton()}
           />
  }

  render() {
    return this.props.errorType === ERROR_AUTHENTICATION ?
            this.renderSessionTimeoutAlert()
            : this.renderErrorActionAlert();
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