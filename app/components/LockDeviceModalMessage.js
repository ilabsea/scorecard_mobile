import React from 'react';

import { LocalizationContext } from './Translations';
import ErrorMessageContent from './ErrorMessageModal/ErrorMessageContent';

class LockDeviceModalMessage extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return <ErrorMessageContent
              onDismiss={this.props.onDismiss}
              message={ translations.formatString(translations.yourDeviceIsCurrentlyLocked, this.props.unlockAt) }
            />
  }
}

export default LockDeviceModalMessage;