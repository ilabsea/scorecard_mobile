import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper';

import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import indicatorHelper from '../../helpers/indicator_helper';
import uuidv4 from '../../utils/uuidv4';
import Color from '../../themes/color';

import { LocalizationContext } from '../Translations';
import ScorecardResultAccordionSwotItems from './ScorecardResultAccordionSwotItems';

class ScorecardResultAccordionContent extends Component {
  static contextType = LocalizationContext;

  renderMedian(criteria, fieldName) {
    const label = criteria.median ? criteria.median : this.context.translations.notVoted;

    return (
      <View style={{flexDirection: 'row', marginVertical: 16}}>
        <Text style={styles.itemTitleText}>{this.context.translations[fieldName]}</Text>
        <Text style={[styles.itemValueText, !criteria.median ? styles.warningLabel : {} ]}>
          { label }
        </Text>
      </View>
    )
  }

  render() {
    const {criteria} = this.props;
    const fieldNames = ['score', 'strength', 'weakness', 'suggested_action'];
    const indicator = indicatorHelper.getDisplayIndicator(criteria);

    return fieldNames.map((fieldName, index) => {
      return (
        <View key={uuidv4()} style={{paddingHorizontal: 20, backgroundColor: Color.accordionContentBgColor}}>
          { index == 0 && this.renderMedian(criteria, fieldName) }

          { index > 0 &&
            <ScorecardResultAccordionSwotItems criteria={criteria} fieldName={fieldName}
              indicator={indicator} onPress={this.props.onPress}
              isRequired={this.props.isRequired}
              isScorecardFinished={this.props.isScorecardFinished}
            />
          }

          { index < fieldNames.length - 1 && <Divider style={{backgroundColor: '#b3b3b3', marginVertical: 1}}/> }
        </View>
      )
    });
  }
}

export default ScorecardResultAccordionContent;