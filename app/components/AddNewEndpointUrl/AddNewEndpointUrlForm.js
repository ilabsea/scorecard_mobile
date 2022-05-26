import React from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import DeleteButton from './DeleteButton';
import TextFieldInput from '../TextFieldInput';

import endpointFormService from '../../services/endpoint_form_service';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';
import { bodyFontSize } from '../../utils/font_size_util';

class AddNewEndpointUrlForm extends React.Component {
  static contextType = LocalizationContext
  constructor(props) {
    super(props);

    this.state = {
      endpointLabel: '',
      endpointValue: '',
      endpointUuid: '',
      endpointLabelErrorMsg: '',
      endpointValueErrorMsg: '',
      isAllowToDeleteOrEdit: true,
      selectedEndpoint: null,
    }
  }

  async componentDidMount() {
    const selectedEndpoint = await endpointFormService.getEndpointForEdit();

    if (!!selectedEndpoint) {
      this.setState({
        selectedEndpoint: selectedEndpoint,
        endpointLabel: selectedEndpoint.label,
        endpointValue: selectedEndpoint.value.toString(),
        endpointUuid: selectedEndpoint.uuid,
        isAllowToDeleteOrEdit: await endpointFormService.isAllowToDeleteOrEdit(selectedEndpoint),
      });
    }

    this.props.validateForm && this.props.validateForm();
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;
    state[`${fieldName}ErrorMsg`] = endpointFormService.getErrorMessage(fieldName, value, this.state.selectedEndpoint);

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
            label={`${translations.serverUrl} (${translations.httpsRecommended})`}
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
        <Text style={{fontSize: bodyFontSize(), marginBottom: 10}}>{ this.context.translations.pleaseEnterInformationBelow }</Text>

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