import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { mediumIconSize } from '../../utils/font_size_util';

const RightArrowIcon = (props) => {
  const color = props.color || Color.blackColor;

  return <View style={{justifyContent: 'center', marginLeft: 10}}>
            <Icon name='chevron-forward-outline' style={[{color: color, fontSize: mediumIconSize(), width: getDeviceStyle(16, 13)}, props.iconStyle]} />
         </View>
}

export default RightArrowIcon;