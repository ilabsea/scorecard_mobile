import React, { Component } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import AccordionSwitcher from '../AccordionSwitcher/AccordionSwitcher';
import ParticipantAccordion from '../ParticipantAccordion/ParticipantAccordion';
import IndicatorAccordion from '../IndicatorAccordion/IndicatorAccordion';
import EmptyListAction from '../Share/EmptyListAction';

import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicatorTabletStyles from '../../styles/tablet/ProposedIndicatorComponentStyle';
import ProposedIndicatorMobileStyles from '../../styles/mobile/ProposedIndicatorComponentStyle';

const responsiveStyles = getDeviceStyle(ProposedIndicatorTabletStyles, ProposedIndicatorMobileStyles);

class ProposedIndicatorAccordions extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props)
    this.state = {
      accordionType: props.isIndicatorBase ? 'indicator' : 'participant'
    }
  }

  renderAccordionSwitcher() {
    const { translations } =  this.context;
    const accordionTypes = {
      indicatorBase: {left_label: translations.raisedIndicator, left_type: 'indicator', right_label: translations.raisedParticipant, right_type: 'participant'},
      participantBase: {left_label: translations.raisedParticipant, left_type: 'participant', right_label: translations.raisedIndicator, right_type: 'indicator'}
    }
    const accordion = accordionTypes[this.props.isIndicatorBase ? 'indicatorBase' : 'participantBase']

    return (
      <AccordionSwitcher
        scorecardUuid={this.props.scorecardUuid}
        leftLabel={ accordion.left_label }
        rightLabel={ accordion.right_label }
        activeSide={this.state.accordionType == accordion.left_type ? ACCORDION_LEFT : ACCORDION_RIGHT}
        onPressLeft={() => this.setState({ accordionType: accordion.left_type })}
        onPressRight={() => this.setState({ accordionType: accordion.right_type })}
        numberOfProposedParticipant={this.props.numberOfProposedParticipant}
      />
    )
  }

  renderEmptyListAction() {
    const {translations} = this.context;

    return (
      <View style={{height: '100%'}}>
        <EmptyListAction
          title={translations.pleaseProposeIndicator}
          buttonLabel={translations.proposeNewIndicator}
          onPress={() => this.props.startProposeIndicator()}
          customContainerStyle={responsiveStyles.noDataContainer}
        />
      </View>
    )
  }

  render() {
    return (
      <React.Fragment>
        { this.renderAccordionSwitcher() }

        { this.props.proposedParticipants.length == 0 &&
          this.renderEmptyListAction()
        }

        { this.state.accordionType == 'participant' ?
          <ParticipantAccordion scorecardUuid={this.props.scorecardUuid} isIndicatorBase={this.props.isIndicatorBase} />
          :
          <IndicatorAccordion scorecardUuid={this.props.scorecardUuid} />
        }
      </React.Fragment>
    )
  }
}

export default ProposedIndicatorAccordions;