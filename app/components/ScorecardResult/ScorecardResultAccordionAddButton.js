import React, { Component } from 'react';

import { LocalizationContext } from '../Translations';
import ScorecardResultAddButton from './ScorecardResultAddButton';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';

class ScorecardResultAccordionAddButton extends Component {
  static contextType = LocalizationContext;

  onPress() {
    const { criteria, fieldName, indicator } = this.props;

    if (!criteria.median)
      return;

    this.props.onPress(criteria, fieldName, indicator, true)
  }

  render() {
    return (
      <ScorecardResultAddButton
        onPress={() => this.onPress()}
        btnStyle={styles.btn}
        textStyle={styles.btnText}
        isScorecardFinished={this.props.isScorecardFinished}
        criteria={this.props.criteria}
      />
    );
  }
}

export default ScorecardResultAccordionAddButton;