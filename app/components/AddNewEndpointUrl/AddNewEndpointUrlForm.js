import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import DeleteButton from './DeleteButton';
import TextFieldInput from '../TextFieldInput';

import endpointFormService from '../../services/endpoint_form_service';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';

class AddNewEndpointUrlForm extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    const selectedEndpoint = null

    this.state = {
      endpointLabel: selectedEndpoint ? selectedEndpoint.label : '',
      endpointValue: selectedEndpoint ? selectedEndpoint.value : 'https://',
      endpointUuid: selectedEndpoint ? EndpointUrl.findByUrlValue(selectedEndpoint.value).uuid : '',
      endpointLabelErrorMsg: '',
      endpointValueErrorMsg: '',
      // isAllowToDeleteOrEdit: selectedEndpoint ? endpointFormService.isAllowToDeleteOrEdit(props.selectedEndpoint, props.savedEndpoint) : true,

      selectedEndpoint: null,
    }
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = endpointFormService.getErrorMessage(fieldName, value, this.props.editEndpoint);

    this.setState(state, () => !!this.props.validateForm && this.props.validateForm());
  }

  renderLabelInput() {
    const { translations } = this.context;
    return <TextFieldInput
            value={this.state.endpointLabel}
            label={translations.serverLabel}
            placeholder={translations.enterServerLabel}
            fieldName={ENDPOINT_LABEL_FIELDNAME}
            isRequire={true}
            onChangeText={this.onChangeText}
            message={translations[this.state.endpointLabelErrorMsg]}
          />
  }

  renderUrlInput() {
    const { translations } = this.context;
    return <TextFieldInput
            value={this.state.endpointValue}
            label={translations.serverUrl}
            placeholder={translations.enterServerUrl}
            fieldName={ENDPOINT_VALUE_FIELDNAME}
            isRequire={true}
            onChangeText={this.onChangeText}
            message={translations[this.state.endpointValueErrorMsg]}
          />
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.renderLabelInput() }
        { this.renderUrlInput() }

        { !!this.state.selectedEndpoint &&
          <DeleteButton
            selectedEndpoint={this.state.selectedEndpoint}
            isAllowToDeleteOrEdit={this.state.isAllowToDeleteOrEdit}
            endpointUuid={this.state.endpointUuid}
            reloadEndpoint={() => this.reloadEndpoint()}
          />
        }
      </View>
    )
  }
}

export default AddNewEndpointUrlForm;