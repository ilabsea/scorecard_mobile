import React, { Component } from 'react';

import Accordion from '../Accordion';
import ScorecardResultAccordionTitle from './ScorecardResultAccordionTitle';
import ScorecardResultAccordionContent from './ScorecardResultAccordionContent';

let _this = null;

class ScorecardResultAccordion extends Component {
  constructor(props) {
    super(props);
    _this = this;
  }

  onPress = (selectedIndicator, fieldName, indicator, isAddNew) => {
    if (isAddNew && _this.props.isScorecardFinished)
      return;

    !!_this.props.onPress && _this.props.onPress(selectedIndicator, fieldName, indicator);
  }

  renderAccordionContent(indicator) {
    return <ScorecardResultAccordionContent indicator={indicator} onPress={_this.onPress} isRequired={_this.isRequired(indicator)} isScorecardFinished={_this.props.isScorecardFinished}  />
  }

  isRequired(indicator) {
    return !indicator.suggested_action ? true : false;
  }

  renderTitleText(indicator, index) {
    return <ScorecardResultAccordionTitle indicator={indicator} order={index + 1} scorecardUuid={_this.props.scorecardUuid} isRequired={_this.isRequired(indicator)} />
  }

  render() {
    return (
      <Accordion
        items={this.props.indicators}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
        customItemStyle={{ paddingVertical: 2 }}
      />
    );
  }
}

export default ScorecardResultAccordion;