import React, { Component } from 'react';

import {LocalizationContext} from '../Translations';
import Accordion from '../Accordion';
import ParticipantAccordionTitle from './ParticipantAccordionTitle';
import ParticipantAccordionContent from './ParticipantAccordionContent';

import Participant from '../../models/Participant';

let _this = null;

class ParticipantAccordion extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      participants: []
    }
  }

  componentDidMount() {
    const  raisedParticipants = Participant.getRaisedParticipants(this.props.scorecardUuid);
    this.setState({ participants: raisedParticipants})
  }

  renderTitleText(participant) {
    return ( <ParticipantAccordionTitle participant={participant} /> )
  }

  renderAccordionContent(participant) {
    return (
      <ParticipantAccordionContent
        scorecardUuid={_this.props.scorecardUuid}
        participantUuid={participant.uuid}
        isIndicatorBase={_this.props.isIndicatorBase}
      />
    )
  }

  render() {
    return (
      <Accordion
        items={this.state.participants}
        accordionTitle={this.renderTitleText}
        accordionContent={this.renderAccordionContent}
      />
    )
  }
}

export default ParticipantAccordion;
