import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { LocalizationContext } from '../Translations';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';

class ScorecardResultAccordionAddButton extends Component {
  static contextType = LocalizationContext;

  textColor = () => {
    return this.props.isScorecardFinished ? { color: 'gray' } : {};
  }

  render() {
    const { criteria, fieldName, indicator } = this.props;

    return (
      <TouchableOpacity onPress={() => this.props.onPress(criteria, fieldName, indicator, true)} style={{alignItems: 'center'}}>
        <View style={styles.btn}>
          <Text style={[styles.btnText, this.textColor()]}>{ this.context.translations.addText }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ScorecardResultAccordionAddButton;