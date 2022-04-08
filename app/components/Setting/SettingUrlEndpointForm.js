import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import SettingUrlEndpointFormToggleButton from './SettingUrlEndpointFormToggleButton';
import SettingUrlEndpointFormInputs from './SettingUrlEndpointFormInputs';

import endpointFormService from '../../services/endpoint_form_service';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';

class SettingUrlEndpointForm extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);
    this.state = {
      endpointLabel: '',
      endpointValue: 'https://',
      endpointLabelErrorMsg: '',
      endpointValueErrorMsg: '',
      isFormVisible: false,
      isFormValid: false,
    }
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = endpointFormService.getErrorMessage(fieldName, value, this.props.endpointUrls);

    this.setState(state, () => {
      this.setState({ isFormValid: endpointFormService.isValidForm(this.state.endpointLabel, this.state.endpointValue, this.props.endpointUrls) })
    });
  }

  saveEndpoint() {
    endpointFormService.saveEndpointUrls(this.state.endpointLabel, this.state.endpointValue);
    this.props.saveNewEndpoint(this.state.endpointLabel, this.state.endpointValue);
    this.clearData();
    this.setState({ isFormVisible: false });
  }

  clearData() {
    const fieldNames = [ ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME ];
    fieldNames.map(fieldName => {
      let state = {};
      state[fieldName] = fieldName === ENDPOINT_VALUE_FIELDNAME ? 'https://' : '';
      state[`${fieldName}ErrorMsg`] = '';
      this.setState(state);
    });
  }

  renderForm() {
    const {translations} = this.context;
    return <SettingUrlEndpointFormInputs
             endpointLabel={this.state.endpointLabel}
             endpointValue={this.state.endpointValue}
             endpointLabelErrorMsg={translations[this.state.endpointLabelErrorMsg]}
             endpointValueErrorMsg={translations[this.state.endpointValueErrorMsg]}
             isFormValid={this.state.isFormValid}
             onChangeText={this.onChangeText}
             saveEndpoint={() => this.saveEndpoint()}
           />
  }

  toggleForm() {
    this.setState({ isFormVisible: !this.state.isFormVisible });
    this.clearData();
  }

  render() {
    return (
      <View style={{marginBottom: this.state.isFormVisible ? -28 : 0}}>
        <SettingUrlEndpointFormToggleButton isFormVisible={this.state.isFormVisible}
          toggleForm={() => this.toggleForm()}
        />
        { this.state.isFormVisible && this.renderForm() }
      </View>
    )
  }
}

export default SettingUrlEndpointForm;