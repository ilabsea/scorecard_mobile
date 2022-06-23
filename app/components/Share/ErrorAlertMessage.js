import React from 'react';

import { LocalizationContext } from '../Translations';
import CustomAlertMessage from './CustomAlertMessage';
import { getAlertMessageObject } from '../../utils/alert_message_util';

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

   render() {
      return <CustomAlertMessage
                visible={this.props.visible}
                title={!!this.state.alertMessage ? this.state.alertMessage.title : ''}
                description={!!this.state.alertMessage ? this.state.alertMessage.description : ''}
                closeButtonLabel={ this.context.translations.close }
                hasConfirmButton={this.props.hasConfirmButton}
                confirmButtonLabel={this.props.confirmButtonLabel}
                isConfirmButtonDisabled={this.props.isConfirmButtonDisabled}
                onDismiss={() => this.props.onDismiss(true)}
                onConfirm={() => this.props.onConfirm()}
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