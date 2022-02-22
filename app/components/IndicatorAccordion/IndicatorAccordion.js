import React, { Component } from 'react';

import {LocalizationContext} from '../Translations';
import Accordion from '../Accordion';
import IndicatorAccordionTitle from './IndicatorAccordionTitle';
import IndicatorAccordionContent from './IndicatorAccordionContent';
import proposedIndicatorService from '../../services/proposed_indicator_service';

let _this = null;

class IndicatorAccordion extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      indicators: [],
    }
  }

  componentDidMount() {
    const indicators = proposedIndicatorService.getProposedIndicators(this.props.scorecardUuid);
    this.setState({ indicators })
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
        items={this.state.indicators}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
      />
    )
  }
}

export default IndicatorAccordion;