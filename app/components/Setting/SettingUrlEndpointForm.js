import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import TextFieldInput from '../TextFieldInput';
import SaveButton from '../SaveButton';

import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import endpointFormService from '../../services/endpoint_form_service';

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
    state[`${fieldName}ErrorMsg`] = '';
    this.setState(state, () => {
      this.setState({ isFormValid: endpointFormService.isValidForm(this.state.endpointLabel, this.state.endpointValue) })
    });
  }

  renderForm() {
    return (
      <View style={{flexDirection: 'row', height: 120}}>
        <View style={{flex: 1, paddingRight: 10}}>
          <TextFieldInput
            value={this.state.endpointLabel}
            label='Endpoint Label'
            placeholder='Enter endpoint label'
            fieldName="endpointLabel"
            onChangeText={this.onChangeText}
            message={this.context.translations[this.state.endpointLabelErrorMsg]}
          />
        </View>

        <View style={{flex: 1}}>
          <TextFieldInput
            value={this.state.endpointValue}
            label='URL Endpoint'
            placeholder='Enter URL endpoint'
            fieldName="endpointValue"
            onChangeText={this.onChangeText}
            message={this.context.translations[this.state.endpointValueErrorMsg]}
          />
        </View>

        <SaveButton label='Save' customStyle={{ marginTop: 10 }} disabled={!this.state.isFormValid} />
      </View>
    )
  }

  render() {
    return (
      <View style={{marginBottom: this.state.isFormVisible ? -28 : 0}}>
        <View style={{ alignItems: 'flex-start' }}>
          <TouchableOpacity onPress={() => this.setState({ isFormVisible: !this.state.isFormVisible })} style={{flexDirection: 'row'}}>
            <Icon size={22}
              name={this.state.isFormVisible ? 'remove-circle' : 'add-circle'}
              style={{marginRight: 5, marginTop: 2}}
              color={Color.clickableColor}
            />

            <Text style={{fontSize: bodyFontSize(), color: Color.clickableColor}}>
              { this.state.isFormVisible ? 'Hide the form' : 'Add new URL endpoint' }
            </Text>
          </TouchableOpacity>
        </View>

        { this.state.isFormVisible && this.renderForm() }
      </View>
    )
  }
}

export default SettingUrlEndpointForm;