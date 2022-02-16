import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import proposedCriteriaService from '../../services/proposed_criteria_service';
import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
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
    const criterias = proposedCriteriaService.getProposedCriterias(this.props.scorecardUuid);

    return (
      <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
        { this.renderButton(responsiveStyles.btnLeft, ACCORDION_LEFT, this.props.leftLabel, this.props.numberOfProposedParticipant) }
        { this.renderButton(responsiveStyles.btnRight, ACCORDION_RIGHT, this.props.rightLabel, criterias.length) }
      </View>
    )
  }
}

export default AccordionSwitcher;