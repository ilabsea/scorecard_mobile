import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import AddNewEndpointUrlForm from './AddNewEndpointUrlForm';
import BottomButton from '../BottomButton';

import { containerPadding } from '../../utils/responsive_util';
import { navigateBack } from '../../utils/navigation_util';
import endpointFormService from '../../services/endpoint_form_service';
import { CUSTOM } from '../../constants/main_constant';
import EndpointUrl from '../../models/EndpointUrl';
import settingHelper from '../../helpers/setting_helper';
import endpointFormHelper from '../../helpers/endpoint_form_helper';

class AddNewEndpointUrlMain extends React.Component {
  static contextType = LocalizationContext
  state = {
    isFormValid: false,
  }

  save() {
    const params = {
      label: this.props.endpoint.label,
      value: this.props.endpoint.value,
      type: CUSTOM,
    }

    EndpointUrl.create(params);
    endpointFormHelper.setNewEndpointAdded(true);
    this.setTempSettingData();
    navigateBack();
  }

  async setTempSettingData() {
    const settingData = await settingHelper.getSettingData();
    const email = !!settingData && !!settingData.email ? settingData.email : '';
    const password = !!settingData && !!settingData.password ? settingData.password : '';
    settingHelper.setTempSettingData(this.props.endpoint.value, email, password);
  }

  updateEndpoint(endpoint) {
    this.setState({ isFormValid: endpointFormService.isValidForm(endpoint.label, endpoint.value) });
    !!this.props.updateEndpoint && this.props.updateEndpoint(endpoint);
  }

  render() {
    const { translations } = this.context;
    return (
      <View style={{flex: 1, padding: containerPadding}}>
        <AddNewEndpointUrlForm
          endpoint={this.props.endpoint}
          updateEndpoint={(endpoint) => this.updateEndpoint(endpoint)}
        />

        <BottomButton
          label={this.state.editEndpoint ? translations.saveAndChange : translations.save}
          onPress={() => this.save()}
          disabled={!this.state.isFormValid}
          iconName='none'
        />
      </View>
    )
  }
}

export default AddNewEndpointUrlMain;