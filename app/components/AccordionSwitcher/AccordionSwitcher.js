import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import { ACCORDION_LEFT, ACCORDION_RIGHT } from '../../constants/main_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import AccordionSwitcherTabletStyles from '../../styles/tablet/AccordionSwitcherComponentStyle';
import AccordionSwitcherMobileStyles from '../../styles/mobile/AccordionSwitcherComponentStyle';

const responsiveStyles = getDeviceStyle(AccordionSwitcherTabletStyles, AccordionSwitcherMobileStyles);

class AccordionSwitcher extends Component {
  static contextType = LocalizationContext;
  renderButton(buttonStyle, side, label, numberOfItem) {
    const isActive = this.props.activeSide == side;
    const btnStyles = this.context.appLanguage == 'en' ? {...buttonStyle, width: wp(getDeviceStyle('33%', '40%'))} : buttonStyle
    return (
      <TouchableOpacity onPress={() => side == ACCORDION_LEFT ? this.props.onPressLeft() : this.props.onPressRight()}
        style={[responsiveStyles.filterBtn, btnStyles, isActive ? responsiveStyles.activeBtn : {}]}
      >
        <Text style={[responsiveStyles.btnText, isActive ? responsiveStyles.activeText : {}]}>{ label } ({numberOfItem})</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        { this.renderButton(responsiveStyles.btnLeft, ACCORDION_LEFT, this.props.leftLabel, this.props.numberOfLeftItem) }
        { this.renderButton(responsiveStyles.btnRight, ACCORDION_RIGHT, this.props.rightLabel, this.props.numberOfRightItem) }
      </View>
    )
  }
}

export default AccordionSwitcher;