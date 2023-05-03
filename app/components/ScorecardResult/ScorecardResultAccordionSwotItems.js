import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { LocalizationContext } from '../Translations';
import ScorecardResultAccordionFieldLabel from './ScorecardResultAccordionFieldLabel';
import Color from '../../themes/color';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';

class ScorecardResultAccordionSwotItems extends Component {
  static contextType = LocalizationContext;
  onPress() {
    const { indicator, fieldName, languageIndicator } = this.props;
    if (!indicator.median)
      return;

    this.props.onPress(indicator, fieldName, languageIndicator, !indicator[fieldName])  // if the indicator[fieldName] = null, it means that it is the add new button otherwise it is the edit button
  }

  renderInputButton() {
    return <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.pressableText, this.props.isScorecardFinished && {color: Color.disabledBtnBg}]}>{this.context.translations.input}</Text>
              <Icon name='chevron-right' size={18} color={this.props.isScorecardFinished ? Color.disabledBtnBg : Color.clickableColor} style={{textAlign: 'right', height: 20}} />
           </View>
  }

  render() {
    const { indicator, fieldName } = this.props;
    return (
      <TouchableOpacity onPress={() => this.onPress()} style={{flexDirection: 'row', paddingVertical: !indicator[fieldName] ? 14 : 6, height: 60, alignItems: 'center'}}>
        <ScorecardResultAccordionFieldLabel indicator={indicator} fieldName={fieldName} isRequired={this.props.isRequired} />
        {this.renderInputButton()}
      </TouchableOpacity>
    )
  }
}

export default ScorecardResultAccordionSwotItems;