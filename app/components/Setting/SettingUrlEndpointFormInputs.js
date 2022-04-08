import React from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import SaveButton from '../SaveButton';
import { ENDPOINT_LABEL_FIELDNAME, ENDPOINT_VALUE_FIELDNAME } from '../../constants/endpoint_constant';

class SettingUrlEndpointFormInputs extends React.Component {
  static contextType = LocalizationContext

  render() {
    return (
      <View style={{flexDirection: 'row', height: 120}}>
        <View style={{flex: 1, paddingRight: 10}}>
          <TextFieldInput
            value={this.props.endpointLabel}
            label={this.context.translations.endpointLabel}
            placeholder={this.context.translations.enterEndpointLabel}
            fieldName={ENDPOINT_LABEL_FIELDNAME}
            onChangeText={this.props.onChangeText}
            message={this.props.endpointLabelErrorMsg}
          />
        </View>

        <View style={{flex: 1}}>
          <TextFieldInput
            value={this.props.endpointValue}
            label={this.context.translations.UrlEndpoint}
            placeholder={this.context.translations.enterUrlEndpoint}
            fieldName={ENDPOINT_VALUE_FIELDNAME}
            onChangeText={this.props.onChangeText}
            message={this.props.endpointValueErrorMsg}
          />
        </View>

        <SaveButton onPress={() => this.props.saveEndpoint()} label={this.context.translations.save} disabled={!this.props.isFormValid}
          customStyle={{ marginTop: 10, elevation: 0 }}
        />
      </View>
    )
  }
}

export default SettingUrlEndpointFormInputs;