import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import AccordionSwitcherTabletStyles from '../../styles/tablet/AccordionSwitcherComponentStyle';
import AccordionSwitcherMobileStyles from '../../styles/mobile/AccordionSwitcherComponentStyle';

const responsiveStyles = getDeviceStyle(AccordionSwitcherTabletStyles, AccordionSwitcherMobileStyles);

class AccordionSwitcher extends Component {
  renderButton(buttonStyle, side, label) {
    const isActive = this.props.activeSide == side;

    return (
      <TouchableOpacity onPress={() => side == ACCORDION_LEFT ? this.props.onPressLeft() : this.props.onPressRight()}
        style={[responsiveStyles.filterBtn, buttonStyle, isActive ? responsiveStyles.activeBtn : {}]}
      >
        <Text style={[responsiveStyles.btnText, isActive ? responsiveStyles.activeText : {}]}>{ label }</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
        { this.renderButton(responsiveStyles.btnLeft, ACCORDION_LEFT, this.props.leftLabel) }
        { this.renderButton(responsiveStyles.btnRight, ACCORDION_RIGHT, this.props.rightLabel) }
      </View>
    )
  }
}

export default AccordionSwitcher;