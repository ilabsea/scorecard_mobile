import React, { Component } from 'react';
import { View } from 'react-native';

import ScorecardResultAccordionFieldLabel from './ScorecardResultAccordionFieldLabel';
import ScorecardResultAccordionAddButton from './ScorecardResultAccordionAddButton';
import ScorecardResultAccordionEditButton from './ScorecardResultAccordionEditButton';

class ScorecardResultAccordionSwotItems extends Component {
  render() {
    const { indicator, fieldName, languageIndicator } = this.props;

    return (
      <View style={{flexDirection: 'row', marginVertical: !indicator[fieldName] ? 14 : 6}}>
        <ScorecardResultAccordionFieldLabel indicator={indicator} fieldName={fieldName} isRequired={this.props.isRequired} />

        { !indicator[fieldName] ?
          <ScorecardResultAccordionAddButton indicator={indicator} fieldName={fieldName} languageIndicator={languageIndicator} onPress={this.props.onPress} isScorecardFinished={this.props.isScorecardFinished} />
        :
          <ScorecardResultAccordionEditButton indicator={indicator} fieldName={fieldName} languageIndicator={languageIndicator} onPress={this.props.onPress} />
        }
      </View>
    )
  }
}

export default ScorecardResultAccordionSwotItems;