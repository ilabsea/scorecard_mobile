import React, { Component } from 'react';

import {LocalizationContext} from '../Translations';
import Accordion from '../Accordion';
import IndicatorAccordionTitle from './IndicatorAccordionTitle';
import IndicatorAccordionContent from './IndicatorAccordionContent';
import proposedCriteriaService from '../../services/proposed_criteria_service';

let _this = null;

class IndicatorAccordion extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      criterias: [],
    }
  }

  componentDidMount() {
    const criterias = proposedCriteriaService.getProposedCriterias(this.props.scorecardUuid);
    this.setState({ criterias })
  }

  renderTitleText(indicator) {
    return <IndicatorAccordionTitle scorecardUuid={_this.props.scorecardUuid} indicator={indicator} />
  }

  renderAccordionContent(indicator) {
    return <IndicatorAccordionContent scorecardUuid={_this.props.scorecardUuid} indicator={indicator} />
  }

  render() {
    return (
      <Accordion
        items={this.state.criterias}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
      />
    )
  }
}

export default IndicatorAccordion;