import React from 'react';

import { LocalizationContext } from '../Translations';
import MessageLabel from '../MessageLabel';
import { getDeviceStyle } from '../../utils/responsive_util';
import SettingStyleTabletStyles from '../../styles/tablet/SettingScreenStyle';
import SettingStyleMobileStyles from '../../styles/mobile/SettingScreenStyle';

const responsiveStyles = getDeviceStyle(SettingStyleTabletStyles, SettingStyleMobileStyles);

class LockSignInMessage extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const message = this.props.unlockAt ? translations.formatString(translations.yourDeviceIsCurrentlyLocked, this.props.unlockAt) : '';

    return <MessageLabel
              message={message}
              type='error'
              customStyle={responsiveStyles.messageContainer}
          />
  }
}

export default LockSignInMessage;