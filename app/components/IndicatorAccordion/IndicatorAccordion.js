import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        items={this.props.selectedIndicators.length > 0 ? this.props.selectedIndicators : proposedIndicatorService.getProposedIndicators(this.props.scorecardUuid)}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
      />
    )
  }
}

function mapStateToProps(state) {
  return {selectedIndicators: state.selectedIndicators}
}

export default connect(mapStateToProps, null)(IndicatorAccordion);