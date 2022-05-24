import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';

class EndpointFormTextInputs extends React.Component {
  static contextType = LocalizationContext

  state = {
    showPasswordIcon: 'eye'
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

  render() {
    const { translations } = this.context;

    return (
      <ScrollView  contentContainerStyle={{paddingHorizontal: containerPadding, paddingTop: 4, paddingBottom: 0}}>
        <TextFieldInput
          value={this.props.endpointLabel}
          label={translations.serverLabel}
          placeholder={translations.enterServerLabel}
          fieldName={ENDPOINT_LABEL_FIELDNAME}
          isRequire={true}
          onChangeText={this.props.onChangeText}
          message={translations[this.props.endpointLabelErrorMsg]}
        />

        <TextFieldInput
          value={this.props.endpointValue}
          label={translations.serverUrl}
          placeholder={translations.enterServerUrl}
          fieldName={ENDPOINT_VALUE_FIELDNAME}
          isRequire={true}
          onChangeText={this.props.onChangeText}
          message={translations[this.props.endpointValueErrorMsg]}
        />

        <TextFieldInput
          value={this.props.email}
          label={translations.email}
          placeholder={translations.enterEmail}
          fieldName='email'
          isRequire={true}
          onChangeText={this.props.onChangeText}
          // message={translations[this.props.emailErrorMsg]}
          message=''
          keyboardType='email-address'
          caretHidden={false}
        />

        <TextFieldInput
            value={this.props.password}
            label={`${translations.password} *`}
            placeholder={translations["enterPassword"]}
            fieldName="password"
            onChangeText={this.props.onChangeText}
            // message={translations[this.props.passwordErrorMsg]}
            message=''
            secureTextEntry={this.state.showPasswordIcon == 'eye' ? true : false}
            right={this.renderShowPasswordIcon()}
          />
      </ScrollView>
    )
  }
}

export default EndpointFormTextInputs;