import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocalizationContext } from '../Translations';
import CustomAlertMessage from './CustomAlertMessage';
import CustomAlertMessageBigButton from './CustomAlertMessage/CustomAlertMessageBigButton';
import ConfirmationBottomSheetContent from './ConfirmationBottomSheetContent';
import DynamicHeightBottomSheetModal from '../DynamicHeightBottomSheetModal';

import { getAlertMessageObject } from '../../utils/alert_message_util';
import { ERROR_AUTHENTICATION, RE_LOGIN_REQUIRED, MISMATCHED_ENDPOINT } from '../../constants/error_constant';
import { environment } from '../../config/environment';
import { navigate } from '../../navigators/app_navigator';

class ErrorAlertMessage extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      alertMessage: {},
    }
    this.confirmationModalRef = React.createRef();
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
      }, () => {
        this.confirmationModalRef.current?.setContent(
          <ConfirmationBottomSheetContent
            title={!!this.state.alertMessage ? this.state.alertMessage.title : ''}
            confirmationMessage={!!this.state.alertMessage ? this.state.alertMessage.description : ''}
            customButton={this.bigButton()}
            onPress={() => {
              this.confirmationModalRef.current?.dismiss();
              this.props.onConfirm && this.props.onConfirm();
            }}
          />
        );
        this.confirmationModalRef.current?.present();
      })
    }
  }

  goToSetting() {
    this.confirmationModalRef.current?.dismiss();
    this.props.onDismiss();
    navigate('Setting', { backend_url: this.backendUrl });
  }

  bigButton() {
    if (this.props.errorType === RE_LOGIN_REQUIRED || this.props.errorType == ERROR_AUTHENTICATION || this.props.errorType == MISMATCHED_ENDPOINT)
      return <CustomAlertMessageBigButton
                label={this.context.translations.goToSetting}
                onPress={() => this.goToSetting()}
             />
  }

  render() {
    // const { translations } = this.context;

    // return <CustomAlertMessage
    //           visible={this.props.visible}
    //           title={!!this.state.alertMessage ? this.state.alertMessage.title : ''}
    //           description={!!this.state.alertMessage ? this.state.alertMessage.description : ''}
    //           closeButtonLabel={ this.props.hasConfirmButton ? translations.close : translations.infoCloseLabel }
    //           hasConfirmButton={this.props.hasConfirmButton}
    //           confirmButtonLabel={this.props.confirmButtonLabel}
    //           isConfirmButtonDisabled={this.props.isConfirmButtonDisabled}
    //           onDismiss={() => this.props.onDismiss(true)}
    //           onConfirm={() => this.props.onConfirm()}
    //           customButton={this.bigButton()}
    //        />
    return <DynamicHeightBottomSheetModal
              ref={this.confirmationModalRef}
              onDismiss={() => this.props.onDismiss(true)}
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