import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';

class ScorecardResultAccordionAddButton extends Component {
  static contextType = LocalizationContext;

  textColor = () => {
    return (this.props.isScorecardFinished || !this.props.criteria.median) ? { color: Color.grayColor } : {};
  }

  onPress() {
    const { criteria, fieldName, indicator } = this.props;

    if (!criteria.median)
      return;

    this.props.onPress(criteria, fieldName, indicator, true)
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPress()} style={{alignItems: 'center'}}>
        <View style={styles.btn}>
          <Text style={[styles.btnText, this.textColor()]}>{ this.context.translations.addText }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ScorecardResultAccordionAddButton;