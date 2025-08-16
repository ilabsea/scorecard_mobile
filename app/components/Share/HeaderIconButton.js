import React, {Component} from 'react';
import { TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import { getDeviceStyle } from '../../utils/responsive_util';
import { pressableItemSize } from '../../utils/component_util';

class HeaderIconButton extends Component {
  render() {
    const mobileIconSize = this.props.mobileIconSize || wp('5.5%');

    return (
      <TouchableOpacity onPress={() => !!this.props.onPress && this.props.onPress()}
        style={{width: pressableItemSize(), justifyContent: 'center', alignItems: 'center'}}
      >
        { !!this.props.children ? this.props.children
          : <Icon name={this.props.icon} style={[{fontSize: getDeviceStyle(24, mobileIconSize), marginTop: -2, marginRight: getDeviceStyle(16, 0)}, this.props.iconStyle]} />
        }
      </TouchableOpacity>
    );
  }
}

export default HeaderIconButton;