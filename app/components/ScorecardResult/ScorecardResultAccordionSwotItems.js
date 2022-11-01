import React, { Component } from 'react';
import { View } from 'react-native';

import ScorecardResultAccordionFieldLabel from './ScorecardResultAccordionFieldLabel';
import ScorecardResultAddButton from './ScorecardResultAddButton';
import ScorecardResultEditButton from './ScorecardResultEditButton';

class ScorecardResultAccordionSwotItems extends Component {
  onPress() {
    const { indicator, fieldName, languageIndicator } = this.props;
    this.props.onPress(indicator, fieldName, languageIndicator);
  }

  render() {
    const { indicator, fieldName, languageIndicator } = this.props;

    return (
      <View style={{flexDirection: 'row', marginVertical: 12}}>
        <ScorecardResultAccordionFieldLabel indicator={indicator} fieldName={fieldName} isRequired={this.props.isRequired} />

        { !indicator[fieldName] ?
          <ScorecardResultAddButton indicator={indicator} fieldName={fieldName} languageIndicator={languageIndicator}
            onPress={() => this.onPress()} isScorecardFinished={this.props.isScorecardFinished} requireSignVisible={false}
          />
        :
          <ScorecardResultEditButton indicator={indicator} fieldName={fieldName} languageIndicator={languageIndicator} onPress={() => this.onPress()} />
        }
      </View>
    )
  }
}

export default ScorecardResultAccordionSwotItems;