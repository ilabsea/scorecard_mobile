import React, {Component} from 'react';
import { TextInput } from 'react-native-paper';

import Color from '../../themes/color';

import {LocalizationContext} from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme';

class ScorecardResultTextInput extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      note: props.value,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isDelete && (prevProps.value != this.props.value)) {
      this.setState({ note: this.props.value });
    }
  }

  onChangeText = (text) => {
    this.setState({note: text});
    this.props.onChangeText(this.props.fieldName, text);
  }

  render() {
    return (
      <TextInput
        { ...this.props }
        mode="flat"
        clearButtonMode="while-editing"
        value={this.state.note}
        onChangeText={(text) => this.onChangeText(text)}
        style={[{backgroundColor: 'white', width: '100%'}, this.props.customStyle]}
        theme={{colors: {primary: Color.clickableColor}, fontSize: 49, fonts: { bodyLarge: { fontFamily: FontFamily.body } }}}
        autoCompleteType='off'
        autoCapitalize='none'
        onFocus={() => this.props.scrollTo()}
      />
    );
  }
}

export default ScorecardResultTextInput;