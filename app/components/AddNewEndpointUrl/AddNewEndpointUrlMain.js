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
  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
    }
    this.inputFormRef = React.createRef();
  }

  validateForm() {
    const {endpointLabel, endpointValue} = this.inputFormRef.current?.state;
    this.setState({ isFormValid: endpointFormService.isValidForm(endpointLabel, endpointValue) })
  }

  save() {
    const {endpointLabel, endpointValue} = this.inputFormRef.current?.state;
    const params = {
      label: endpointLabel,
      value: endpointValue,
      type: CUSTOM,
    }

    EndpointUrl.create(params);
    endpointFormHelper.setNewEndpointAdded(true);
    this.setTempSettingData(endpointValue);
    navigateBack();
  }

  async setTempSettingData(url) {
    const settingData = await settingHelper.getSettingData();
    const email = !!settingData && !!settingData.email ? settingData.email : '';
    const password = !!settingData && !!settingData.password ? settingData.password : '';
    settingHelper.setTempSettingData(url, email, password);
  }

  render() {
    const { translations } = this.context;
    return (
      <View style={{flex: 1, padding: containerPadding}}>
        <AddNewEndpointUrlForm
          ref={this.inputFormRef}
          validateForm={() => this.validateForm()}
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