import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextInput,
} from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import { Chip } from 'react-native-paper';
import { FontFamily } from '../../assets/stylesheets/theme/font';

class Autocomplete extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      value: props.defaultValue || '',
      showDropdown: false,
      tag: '',
      focusing: false,
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

  _renderChip = () => {
    if (!this.state.tag) {
      return;
    }

    return (
      <View style={{flexDirection: 'column'}}>
        <Chip
          onClose={() => {
            this.onChangeText('');
            this.setState({tag: '', focusing: true});
            this.tagInput.focus();
          }}>
          {this.state.tag}
        </Chip>
      </View>
    )
  }

  _renderTextInput() {
    return (
      <View style={{position: 'relative', flex: 1}}>
        <TextInput
          { ...this.props }
          value={this.state.value}
          fieldName="value"
          onChangeText={(text) => this.onChangeText(text)}
          onFocus={() => this.setState({showDropdown: true, focusing: true})}
          onBlur={() => this.setState({showDropdown: false, tag: this.state.value, focusing: false})}
          placeholder={this.props.placeholder || this.props.label}
          placeholderTextColor={Color.inputBorderLineColor}
          style={{flex: 1, fontSize: 16, fontFamily: FontFamily.body}}
          ref={(input) => { this.tagInput = input;}}
        />

        { !!this.state.tag && <View style={styles.disabledLayer}></View> }
      </View>
    )
  }

  _renderLabel = () => {
    if (!this.state.focusing && !this.state.tag) {
      return;
    }

    let labelStyle = this.state.focusing ? { color: Color.headerColor } : {};

    return (
      <Text style={[styles.inputLabel, labelStyle]}>{this.props.label}</Text>
    )
  }

  render() {
    let borderStyle = this.state.focusing ? { borderColor: Color.headerColor, borderWidth: 2 } : {};

    return (
      <View style={this.props.style}>
        <View style={[styles.inputWrapper, borderStyle]}>
          { this._renderLabel() }
          { this._renderChip() }
          { this._renderTextInput() }
        </View>

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
    top: 0,
    backgroundColor: '#fff',
    width: '100%',
    zIndex: 1
  },
  listItem: {
    padding: 10,
  },
  inputLabel: {
    position: 'absolute',
    zIndex: 1,
    top: -12,
    left: 8,
    fontSize: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    color: Color.inputBorderLineColor,
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Color.inputBorderLineColor,
    alignItems: 'center',
    borderRadius: 4,
    height: 56,
    paddingHorizontal: 6
  },
  disabledLayer: {
    position: 'absolute',
    backgroundColor: '#fff',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

export default Autocomplete;
