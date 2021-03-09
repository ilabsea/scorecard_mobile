import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import participantHelper from '../../helpers/participant_helper';

class SelectBox extends Component {
  static contextType = LocalizationContext;

  _renderCheckIcon = () => {
    if (this.props.isSelected) {
      const iconSize = this.props.renderSmallSize ? 30 : 60;
      const topPosition = this.props.renderSmallSize ? -5 : -10;

      return (
        <MaterialIcon name='check' size={iconSize} color={Color.headerColor}
          style={{position: 'absolute', top: topPosition, right: 0, zIndex: 10}}
        />
      )
    }
  }

  getColor = (type) => {
    return participantHelper.getItemColor(this.props.isSelected, type);
  }

  render() {
    const containerSize = this.props.renderSmallSize ? 90 : 140;
    const labelSize = this.props.renderSmallSize ? 12 : 16;

    return (
      <TouchableOpacity
        onPress={() => this.props.onPress()}
        style={[styles.container, { borderColor: this.getColor('border'), width: containerSize, height: containerSize }]}
      >
        { this._renderCheckIcon() }
        { this.props.children }
        <Text style={{ color: this.getColor('text'), marginTop: 5, textAlign: 'center', fontSize: labelSize }}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ebebeb',
    borderRadius: 10,
  }
});

export default SelectBox;