import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import { normalLabelSize } from '../../utils/responsive_util';

class AddNewIndicatorButton extends Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.showAddNewIndicatorForm()}
        style={styles.container}
      >
        <Icon name='add' size={30} color={Color.whiteColor} />
        { this.props.scrollDirection == 'up' &&
          <Text style={{color: Color.whiteColor, marginHorizontal: 6, fontSize: normalLabelSize}}>{ this.context.translations.addNewCriteria }</Text>
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 8,
    right: 0,
    zIndex: 10,
    backgroundColor: Color.clickableColor,
    flexDirection: 'row',
    borderRadius: 30,
    padding: 12,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default AddNewIndicatorButton;