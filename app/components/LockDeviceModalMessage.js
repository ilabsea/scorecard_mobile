import React from 'react';

import { LocalizationContext } from './Translations';
import ErrorMessageMain from './ErrorMessageModal/ErrorMessageMain';

class LockDeviceModalMessage extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return <ErrorMessageMain
              onDismiss={this.props.onDismiss}
              message={ translations.formatString(translations.yourDeviceIsCurrentlyLocked, this.props.unlockAt) }
            />
  }
}

export default LockDeviceModalMessage;