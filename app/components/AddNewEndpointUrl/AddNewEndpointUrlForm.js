import React from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import TextFieldInput from '../Share/TextFieldInput';

import endpointFormService from '../../services/endpoint_form_service';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME, ENDPOINT_SHORTCUT_FIELDNAME } from '../../constants/endpoint_constant';
import { bodyFontSize } from '../../utils/font_size_util';

class AddNewEndpointUrlForm extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    this.state = {
      endpointLabel: '',
      endpointValue: '',
      endpointShortcut: '',
      endpointLabelErrorMsg: '',
      endpointValueErrorMsg: '',
      endpointShortcutErrorMsg: '',
    }

    this.props.validateForm && this.props.validateForm();
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = endpointFormService.getValidationMessage(fieldName, value);

    this.setState(state, () => {
      const endpoint = {
        label: this.state.endpointLabel,
        value: this.state.endpointValue,
        shortcut: this.state.endpointShortcut,
      }
      !!this.props.updateEndpoint && this.props.updateEndpoint(endpoint);
    });
  }

  renderTextInputs() {
    const { translations } = this.context;
    const attrs = [
      {
        value: this.state.endpointLabel,
        label: translations.serverLabel,
        placeholder: translations.enterServerLabel,
        field_name: ENDPOINT_LABEL_FIELDNAME,
        message: translations[this.state.endpointLabelErrorMsg],
        maxLength: 28
      },
      {
        value: this.state.endpointValue,
        label: `${translations.serverUrl} (${translations.httpsRecommended})`,
        placeholder: translations.enterServerUrl,
        field_name: ENDPOINT_VALUE_FIELDNAME,
        message: translations[this.state.endpointValueErrorMsg],
        maxLength: 60
      },
      {
        value: this.state.endpointShortcut,
        label: translations.serverShortcut,
        placeholder: translations.enterServerShortcut,
        field_name: ENDPOINT_SHORTCUT_FIELDNAME,
        message: translations[this.state.endpointShortcutErrorMsg],
        maxLength: 8
      }
    ];

    return attrs.map((attr, index) => {
      return <TextFieldInput
                key={index}
                value={attr.value}
                label={attr.label}
                placeholder={attr.placeholder}
                fieldName={attr.field_name}
                isRequire={true}
                onChangeText={this.onChangeText}
                message={attr.message}
                maxLength={attr.maxLength}
              />
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{fontSize: bodyFontSize(), marginBottom: 10}}>{ this.context.translations.pleaseEnterInformationBelow }</Text>
        { this.renderTextInputs() }
      </View>
    )
  }
}

export default AddNewEndpointUrlForm;