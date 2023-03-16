import React, {Component} from 'react';
import { Icon, Button } from "native-base";
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { getDeviceStyle } from '../../utils/responsive_util';

class HeaderIconButton extends Component {
  render() {
    const mobileIconSize = this.props.mobileIconSize || wp('5.5%');

    return (
      <Button transparent onPress={() => !!this.props.onPress && this.props.onPress()}>
        { !!this.props.children ? this.props.children
          : <Icon name={this.props.icon} style={[{fontSize: getDeviceStyle(24, mobileIconSize), marginTop: -2, marginRight: getDeviceStyle(16, 0)}, this.props.iconStyle]} />
        }
      </Button>
    )
  }
}

export default HeaderIconButton;