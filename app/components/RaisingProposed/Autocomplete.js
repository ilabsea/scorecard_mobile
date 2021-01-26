import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import TextFieldInput from '../TextFieldInput';
import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';

class Autocomplete extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || '',
      showDropdown: false
    };
  }

  renderList = () => {
    const { data } = this.props;

    if (!data || !data.length || !this.state.showDropdown) { return }

    let doms = data.map(item =>
      <TouchableOpacity
        onPress={() => {
          this.onChangeText(item);
          Keyboard.dismiss();
        }}
        style={styles.listItem}>
        <Text>{item}</Text>
      </TouchableOpacity>
    )

    return (
      <View style={styles.listWrapper}>
        {doms}
      </View>
    )
  }

  onChangeText = (text) => {
    this.setState({value: text});

    !!this.props.onChangeText && this.props.onChangeText(text);
  }

  render() {
    return (
      <View>
        <TextFieldInput
          { ...this.props }
          value={this.state.value}
          fieldName="value"
          onChangeText={(fieldName, text) => this.onChangeText(text)}
          onFocus={() => this.setState({showDropdown: true})}
          onBlur={() => this.setState({showDropdown: false})}
        />

        { this.renderList() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
    top: -32,
    backgroundColor: '#fff',
    width: '100%',
    zIndex: 1
  },
  listItem: {
    padding: 10,
  }
});

export default Autocomplete;
