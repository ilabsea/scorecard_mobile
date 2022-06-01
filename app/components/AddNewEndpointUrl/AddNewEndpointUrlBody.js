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

class AddNewEndpointUrlBody extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
    }

    this.inputFormRef = React.createRef();
    this.endpointForEdit = null;
  }

  async componentDidMount() {
    this.endpointForEdit = await endpointFormService.getEndpointForEdit();
    this.setState({ isFormValid: this.endpointForEdit ? true : false });
  }

  validateForm() {
    const {endpointLabel, endpointValue} = this.inputFormRef.current?.state;
    this.setState({ isFormValid: endpointFormService.isValidForm(endpointLabel, endpointValue, this.endpointForEdit) })
  }

  save() {
    const {endpointLabel, endpointValue} = this.inputFormRef.current?.state;
    const params = {
      label: endpointLabel,
      value: endpointValue,
      type: CUSTOM,
    }

    if (!this.endpointForEdit)
      EndpointUrl.create(params);
    else
      EndpointUrl.update(this.endpointForEdit.uuid, params);

    endpointFormHelper.setShowEndpointBottomSheetStatus();
    this.storeTempSettingData(endpointValue);
    navigateBack();
  }

  async storeTempSettingData(url) {
    const settingData = await settingHelper.getSettingData();
    const email = !!settingData && !!settingData.email ? settingData.email : '';
    const password = !!settingData && !!settingData.password ? settingData.password : '';
    settingHelper.saveTempSettingData(url, email, password);
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
          // disabled={this.props.isLoading || !this.props.isFormValid || this.props.isLocked}
          disabled={!this.state.isFormValid}
          iconName='none'
        />
      </View>
    )
  }
}

export default AddNewEndpointUrlBody;