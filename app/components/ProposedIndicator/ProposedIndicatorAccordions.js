import React, { Component } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import AccordionSwitcher from '../AccordionSwitcher/AccordionSwitcher';
import ParticipantAccordion from '../ParticipantAccordion/ParticipantAccordion';
import IndicatorAccordion from '../IndicatorAccordion/IndicatorAccordion';
import EmptyListAction from '../Share/EmptyListAction';

import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';

import { isProposeByIndicatorBase } from '../../utils/proposed_indicator_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicatorTabletStyles from '../../styles/tablet/ProposedIndicatorComponentStyle';
import ProposedIndicatorMobileStyles from '../../styles/mobile/ProposedIndicatorComponentStyle';

const responsiveStyles = getDeviceStyle(ProposedIndicatorTabletStyles, ProposedIndicatorMobileStyles);

class ProposedIndicatorAccordions extends Component {
  static contextType = LocalizationContext;
  state = {
    accordionType: 'participant',
    isIndicatorBase: false,
  }

  async componentDidMount() {
    this.setState({ isIndicatorBase: await isProposeByIndicatorBase() });
  }

  renderAccordionSwitcher() {
    const { translations } =  this.context;
    const activeSide = this.state.accordionType == 'indicator' ? ACCORDION_RIGHT : ACCORDION_LEFT;

    return (
      <AccordionSwitcher
        scorecardUuid={this.props.scorecardUuid}
        leftLabel={ translations.raisedParticipant }
        rightLabel={ translations.raisedIndicator }
        activeSide={activeSide}
        onPressLeft={() => this.setState({ accordionType: 'participant' })}
        onPressRight={() => this.setState({ accordionType: 'indicator' })}
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

        { this.props.raisedParticipants.length == 0 &&
          this.renderEmptyListAction()
        }

        { this.state.accordionType == 'participant' ?
          <ParticipantAccordion scorecardUuid={this.props.scorecardUuid} isIndicatorBase={this.state.isIndicatorBase} />
          :
          <IndicatorAccordion scorecardUuid={this.props.scorecardUuid} />
        }
      </React.Fragment>
    )
  }
}

export default ProposedIndicatorAccordions;