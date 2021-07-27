import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { getDeviceStyle } from '../../utils/responsive_util';
import AccordionSwitcherTabletStyles from '../../styles/tablet/AccordionSwitcherComponentStyle';
import AccordionSwitcherMobileStyles from '../../styles/mobile/AccordionSwitcherComponentStyle';

const responsiveStyles = getDeviceStyle(AccordionSwitcherTabletStyles, AccordionSwitcherMobileStyles);

const LEFT = 'left';
const RIGHT = 'right';

class AccordionSwitcher extends Component {
  isActive(side) {
    return this.props.activeSide == side;
  }

  render() {
    return (
      <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => this.props.onPressLeft()}
          style={[responsiveStyles.filterBtn, responsiveStyles.btnLeft, this.isActive(LEFT) ? responsiveStyles.activeBtn : {}]}
        >
          <Text style={[responsiveStyles.btnText, this.isActive(LEFT) ? responsiveStyles.activeText : {}]}>{ this.props.leftLabel }</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onPressRight()}
          style={[responsiveStyles.filterBtn, responsiveStyles.btnRight, this.isActive(RIGHT) ? responsiveStyles.activeBtn : {}]}
        >
          <Text style={[responsiveStyles.btnText, this.isActive(RIGHT) ? responsiveStyles.activeText : {}]}>{ this.props.rightLabel }</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AccordionSwitcher;