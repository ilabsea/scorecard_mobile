import React, {Component} from 'react';
import { Icon, Button } from "native-base";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { getDeviceStyle } from '../utils/responsive_util';

class HeaderIconButton extends Component {

  render() {
    return (
      <Button transparent onPress={() => this.props.onPress()}>
        <Icon name={this.props.icon} style={{fontSize: getDeviceStyle(24, wp('6%')), marginTop: -3, marginRight: getDeviceStyle(16, 0)}} />
      </Button>
    )
  }
}

export default HeaderIconButton;