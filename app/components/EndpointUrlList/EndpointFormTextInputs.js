import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';
import EndpointUrl from '../../models/EndpointUrl';
import endpointFormService from '../../services/endpoint_form_service';

class EndpointFormTextInputs extends React.Component {
  static contextType = LocalizationContext

  state = {
    showPasswordIcon: 'eye',
    endpointLabel: this.props.editEndpoint ? this.props.editEndpoint.label : '',
    endpointValue: this.props.editEndpoint ? this.props.editEndpoint.value : 'https://',
    endpointUuid: this.props.editEndpoint ? EndpointUrl.findByUrlValue(this.props.editEndpoint.value).uuid : '',
    endpointLabelErrorMsg: '',
    endpointValueErrorMsg: '',
    email: '',
    password: '',
    emailErrorMsg: '',
  }

  renderShowPasswordIcon = () => {
    return (
      <TextInput.Icon
        name={this.state.showPasswordIcon}
        color="#959595"
        onPress={() => this.setState({ showPasswordIcon: this.state.showPasswordIcon == 'eye' ? 'eye-off' : 'eye' })}
      />
    )
  }

  onChangeText = (fieldName, value) => {
    let state = {};
    state[fieldName] = value;

    if (fieldName != 'email' && fieldName != 'password')
      state[`${fieldName}ErrorMsg`] = endpointFormService.getErrorMessage(fieldName, value, this.props.editEndpoint);

    this.setState(state, () => this.props.validateForm());
  }

  render() {
    const { translations } = this.context;

    return (
      <ScrollView  contentContainerStyle={{paddingHorizontal: containerPadding, paddingTop: 4, paddingBottom: 0}}>
        <TextFieldInput
          value={this.state.endpointLabel}
          label={translations.serverLabel}
          placeholder={translations.enterServerLabel}
          fieldName={ENDPOINT_LABEL_FIELDNAME}
          isRequire={true}
          onChangeText={this.onChangeText}
          message={translations[this.state.endpointLabelErrorMsg]}
        />

        <TextFieldInput
          value={this.state.endpointValue}
          label={translations.serverUrl}
          placeholder={translations.enterServerUrl}
          fieldName={ENDPOINT_VALUE_FIELDNAME}
          isRequire={true}
          onChangeText={this.onChangeText}
          message={translations[this.state.endpointValueErrorMsg]}
        />

        <TextFieldInput
          value={this.state.email}
          label={translations.email}
          placeholder={translations.enterEmail}
          fieldName='email'
          isRequire={true}
          onChangeText={this.onChangeText}
          message={translations[this.state.emailErrorMsg]}
          keyboardType='email-address'
          caretHidden={false}
          onBlur={() => this.setState({ emailErrorMsg: endpointFormService.getEmailErrorMessage(this.state.email, this.state.endpointValue)})}
        />

        <TextFieldInput
            value={this.state.password}
            label={`${translations.password} *`}
            placeholder={translations["enterPassword"]}
            fieldName="password"
            onChangeText={this.onChangeText}
            message=''
            secureTextEntry={this.state.showPasswordIcon == 'eye' ? true : false}
            right={this.renderShowPasswordIcon()}
          />
      </ScrollView>
    )
  }
}

export default EndpointFormTextInputs;