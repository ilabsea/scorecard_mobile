import React, { Component } from 'react';
import { View } from 'react-native';

import ScorecardResultAccordionFieldLabel from './ScorecardResultAccordionFieldLabel';
import ScorecardResultAccordionAddButton from './ScorecardResultAccordionAddButton';
import ScorecardResultAccordionEditButton from './ScorecardResultAccordionEditButton';

class ScorecardResultAccordionSwotItems extends Component {
  render() {
    const { criteria, fieldName, indicator } = this.props;

    return (
      <View style={{flexDirection: 'row', marginVertical: !criteria[fieldName] ? 14 : 6}}>
        <ScorecardResultAccordionFieldLabel criteria={criteria} fieldName={fieldName} isRequired={this.props.isRequired} />

        { !criteria[fieldName] ?
          <ScorecardResultAccordionAddButton criteria={criteria} fieldName={fieldName} indicator={indicator} onPress={this.props.onPress} />
        :
          <ScorecardResultAccordionEditButton criteria={criteria} fieldName={fieldName} indicator={indicator} onPress={this.props.onPress} />
        }
      </View>
    )
  }
}

export default ScorecardResultAccordionSwotItems;