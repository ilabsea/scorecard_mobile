import React, { Component } from 'react';

import {LocalizationContext} from '../Translations';
import Accordion from '../Accordion';
import ParticipantAccordionMain from './ParticipantAccordionMain';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';

import Participant from '../../models/Participant';

import { getDeviceStyle } from '../../utils/responsive_util'
import { bodyFontSize, getMobileFontSizeByPixelRatio } from '../../utils/font_size_util';
import ParticipantAccordionMobileStyles from '../../styles/mobile/ParticipantAccordionComponentStyle';
import ParticipantAccordionTabletStyles from '../../styles/tablet/ParticipantAccordionComponentStyle';

const styles = getDeviceStyle(ParticipantAccordionTabletStyles, ParticipantAccordionMobileStyles);

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
    const mobileFontSize = getMobileFontSizeByPixelRatio(14.2, 13);
    const fontSize = getDeviceStyle(bodyFontSize(), mobileFontSize);
    return <ParticipantListItemInfo participant={participant} fontSize={fontSize} containerStyle={styles.accordionItemContainer} />
  }

  renderAccordionContent(participant) {
    return (
      <ParticipantAccordionMain
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