import React from 'react';

import { LocalizationContext } from '../Translations';
import HeaderWithConfirmModal from '../Share/HeaderWithConfirmModal';

import { navigateBack } from '../../utils/navigation_util';
import settingHelper from '../../helpers/setting_helper';
import endpointFormHelper from '../../helpers/endpoint_form_helper';

class SettingHeader extends React.Component {
  static contextType = LocalizationContext;
  state = {
    visibleConfirmModal: false,
  }

  async onBackPress() {
    if (await settingHelper.hasDiscardAlert())
      this.setState({ visibleConfirmModal: true })
    else
      this.goBack();
  }

  goBack() {
    this.setState({ visibleConfirmModal: false }, () => {
      settingHelper.clearTempSettingData();
      endpointFormHelper.clearHasNewEndpointAdded();
      navigateBack();
    });
  }

  render() {
    const { translations } = this.context;

    return <HeaderWithConfirmModal
              title={translations.setting}
              modalDescription={translations.doYouWantToDiscardTheseChanges}
              visibleConfirmModal={this.state.visibleConfirmModal}
              onBackPress={() => this.onBackPress()}
              goBack={() => this.goBack()}
              onDismiss={() => this.setState({ visibleConfirmModal: false })}
           />
  }
}

export default SettingHeader;