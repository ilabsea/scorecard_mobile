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

  onPress = (criteria, fieldName, indicator, isAddNew) => {
    if (isAddNew && _this.props.isScorecardFinished)
      return;

    !!_this.props.onPress && _this.props.onPress(criteria, fieldName, indicator);
  }

  renderAccordionContent(criteria) {
    return <ScorecardResultAccordionContent criteria={criteria} onPress={_this.onPress} isRequired={_this.isRequired(criteria)} isScorecardFinished={_this.props.isScorecardFinished}  />
  }

  isRequired(criteria) {
    return !criteria.suggested_action ? true : false;
  }

  renderTitleText(criteria) {
    return <ScorecardResultAccordionTitle criteria={criteria} isRequired={_this.isRequired(criteria)} />
  }

  render() {
    return (
      <Accordion
        items={this.props.criterias}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
      />
    );
  }
}

export default ScorecardResultAccordion;