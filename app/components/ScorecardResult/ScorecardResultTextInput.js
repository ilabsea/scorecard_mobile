import React, {Component} from 'react';
import { TextInput } from 'react-native-paper';

import Color from '../../themes/color';

import {LocalizationContext} from '../Translations';

class ScorecardResultTextInput extends Component {
  static contextType = LocalizationContext;

  onChangeText = (value) => {
    this.props.onChangeText(this.props.fieldName, value);
  }

  render() {
    return (
      <TextInput
        { ...this.props }
        mode="flat"
        clearButtonMode="while-editing"
        value={this.props.value.toString()}
        onChangeText={(text) => this.onChangeText(text)}
        style={[{backgroundColor: 'white', width: '100%'}, this.props.customStyle]}
        theme={{colors: {primary: Color.clickableColor}, fontSize: 49}}
        autoCompleteType='off'
        autoCapitalize='none'
        autoCorrect={false}
      />
    );
  }
}

export default ScorecardResultTextInput;