import React, { Component } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import AccordionSwitcher from '../AccordionSwitcher/AccordionSwitcher';
import ParticipantAccordion from '../ParticipantAccordion/ParticipantAccordion';
import CriteriaAccordion from '../CriteriaAccordion/CriteriaAccordion';
import NoDataMessage from '../NoDataMessage';

import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';

import { getDeviceStyle } from '../../utils/responsive_util';
import RaisingProposedTabletStyles from '../../styles/tablet/RaisingProposedComponentStyle';
import RaisingProposedMobileStyles from '../../styles/mobile/RaisingProposedComponentStyle';

const responsiveStyles = getDeviceStyle(RaisingProposedTabletStyles, RaisingProposedMobileStyles);

class ProposedCriteriaAccordions extends Component {
  static contextType = LocalizationContext;
  state = {
    accordionType: 'participant'
  }

  renderAccordionSwitcher() {
    const { translations } =  this.context;
    const activeSide = this.state.accordionType == 'criteria' ? ACCORDION_RIGHT : ACCORDION_LEFT;

    return (
      <AccordionSwitcher
        scorecardUuid={this.props.scorecardUuid}
        leftLabel={ translations.raisedParticipant }
        rightLabel={ translations.raisedIndicator }
        activeSide={activeSide}
        onPressLeft={() => this.setState({ accordionType: 'participant' })}
        onPressRight={() => this.setState({ accordionType: 'criteria' })}
        numberOfProposedParticipant={this.props.numberOfProposedParticipant}
      />
    )
  }

  renderNoDataMessage() {
    const {translations} = this.context;

    return (
      <View style={{height: '100%'}}>
        <NoDataMessage
          title={translations.pleaseProposeIndicator}
          buttonLabel={translations.proposeNewIndicator}
          onPress={() => this.props.showModal()}
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
          this.renderNoDataMessage()
        }

        { this.state.accordionType == 'participant' ?
          <ParticipantAccordion scorecardUuid={this.props.scorecardUuid} navigation={this.props.navigation} />
          :
          <CriteriaAccordion scorecardUuid={this.props.scorecardUuid} />
        }
      </React.Fragment>
    )
  }
}

export default ProposedCriteriaAccordions;