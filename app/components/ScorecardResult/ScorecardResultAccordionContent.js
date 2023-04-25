import React, { Component } from 'react';
import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import indicatorHelper from '../../helpers/indicator_helper';
import uuidv4 from '../../utils/uuidv4';
import Color from '../../themes/color';

import { LocalizationContext } from '../Translations';
import ScorecardResultAccordionSwotItems from './ScorecardResultAccordionSwotItems';

class ScorecardResultAccordionContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const {indicator} = this.props;
    const fieldNames = ['strength', 'weakness', 'suggested_action'];
    const languageIndicator = indicatorHelper.getDisplayIndicator(indicator);

    return fieldNames.map((fieldName, index) => {
      return (
        <View key={uuidv4()} style={{paddingHorizontal: 20, backgroundColor: Color.accordionContentBgColor}}>
          <ScorecardResultAccordionSwotItems indicator={indicator} fieldName={fieldName}
            languageIndicator={languageIndicator} onPress={this.props.onPress}
            isRequired={this.props.isRequired}
            isScorecardFinished={this.props.isScorecardFinished}
          />

          { index < fieldNames.length - 1 && <Divider style={{backgroundColor: '#b3b3b3', marginVertical: 1}}/> }
        </View>
      )
    });
  }
}

export default ScorecardResultAccordionContent;