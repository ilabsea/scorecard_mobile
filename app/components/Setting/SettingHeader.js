import React from 'react';

import { LocalizationContext } from '../Translations';
import HeaderWithDiscardAlert from '../Share/HeaderWithDiscardAlert';

import settingHelper from '../../helpers/setting_helper';
import endpointFormHelper from '../../helpers/endpoint_form_helper';

class SettingHeader extends React.Component {
  static contextType = LocalizationContext;

  async hasDiscardAlert() {
    return await settingHelper.hasDiscardAlert();
  }

  onGoBack() {
    settingHelper.clearTempSettingData();
    endpointFormHelper.clearHasNewEndpointAdded();
  }

  render() {
    return <HeaderWithDiscardAlert
              title={this.context.translations.setting}
              onGoBack={() => this.onGoBack()}
              hasDiscardAlert={() => this.hasDiscardAlert()}
            />
  }
}

export default SettingHeader;