import React, { Component } from 'react';

import {LocalizationContext} from '../Translations';
import Accordion from '../Accordion';
import CriteriaAccordionTitle from './CriteriaAccordionTitle';
import CriteriaAccordionContent from './CriteriaAccordionContent';

import { Criteria } from '../../services/criteria_service';

let _this = null;

class CriteriaAccordion extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      criterias: [],
    }
  }

  componentDidMount() {
    const criterias = new Criteria(this.props.scorecardUuid).getCriterias();
    this.setState({ criterias })
  }

  renderTitleText(criteria) {
    return <CriteriaAccordionTitle scorecardUuid={_this.props.scorecardUuid} criteria={criteria} />
  }

  renderAccordionContent(criteria) {
    return <CriteriaAccordionContent scorecardUuid={_this.props.scorecardUuid} criteria={criteria} />
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

export default CriteriaAccordion;