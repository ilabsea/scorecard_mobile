import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import proposedIndicatorService from '../../services/proposed_indicator_service';
import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import Participant from '../../models/Participant';
import AccordionSwitcherTabletStyles from '../../styles/tablet/AccordionSwitcherComponentStyle';
import AccordionSwitcherMobileStyles from '../../styles/mobile/AccordionSwitcherComponentStyle';

const responsiveStyles = getDeviceStyle(AccordionSwitcherTabletStyles, AccordionSwitcherMobileStyles);

class AccordionSwitcher extends Component {
  renderButton(buttonStyle, side, label, numberOfItem) {
    const isActive = this.props.activeSide == side;

    return (
      <TouchableOpacity onPress={() => side == ACCORDION_LEFT ? this.props.onPressLeft() : this.props.onPressRight()}
        style={[responsiveStyles.filterBtn, buttonStyle, isActive ? responsiveStyles.activeBtn : {}]}
      >
        <Text style={[responsiveStyles.btnText, isActive ? responsiveStyles.activeText : {}]}>{ label } ({numberOfItem})</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const indicators = proposedIndicatorService.getProposedIndicators(this.props.scorecardUuid);
    const numOfRaisedParticipant = Participant.getNumberOfProposedParticipant(this.props.scorecardUuid)

    return (
      <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
        { this.renderButton(responsiveStyles.btnLeft, ACCORDION_LEFT, this.props.leftLabel, numOfRaisedParticipant) }
        { this.renderButton(responsiveStyles.btnRight, ACCORDION_RIGHT, this.props.rightLabel, indicators.length) }
      </View>
    )
  }
}

export default AccordionSwitcher;