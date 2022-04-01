import React, { Component } from 'react';

import { LocalizationContext } from '../Translations';
import ScorecardResultAddButton from './ScorecardResultAddButton';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';

class ScorecardResultAccordionAddButton extends Component {
  static contextType = LocalizationContext;

  onPress() {
    const { indicator, fieldName, languageIndicator } = this.props;

    if (!indicator.median)
      return;

    this.props.onPress(indicator, fieldName, languageIndicator, true)
  }

  render() {
    return (
      <ScorecardResultAddButton
        onPress={() => this.onPress()}
        btnStyle={styles.btn}
        textStyle={styles.btnText}
        isScorecardFinished={this.props.isScorecardFinished}
        indicator={this.props.indicator}
      />
    );
  }
}

export default ScorecardResultAccordionAddButton;