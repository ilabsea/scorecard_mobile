import React from 'react';

import { LocalizationContext } from '../Translations';
import MessageLabel from '../MessageLabel';
import lockSignInService from '../../services/lock_sign_in_service';
import { getDeviceStyle } from '../../utils/responsive_util';
import SettingStyleTabletStyles from '../../styles/tablet/SettingScreenStyle';
import SettingStyleMobileStyles from '../../styles/mobile/SettingScreenStyle';

const responsiveStyles = getDeviceStyle(SettingStyleTabletStyles, SettingStyleMobileStyles);

class LockSignInMessage extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      unlockAt: '',
    }
  }

  async componentDidMount() {
    this.setState({ unlockAt: await lockSignInService.unLockAt() });
  }

  render() {
    const { translations } = this.context;

    return <MessageLabel
              message={translations.formatString(translations.yourDeviceIsCurrentlyLocked, this.state.unlockAt)}
              type='error'
              customStyle={responsiveStyles.messageContainer}
           />
  }
}

export default LockSignInMessage;