import React from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { mediumIconSize } from '../../utils/font_size_util';

const RightArrowIcon = (props) => {
  const color = props.color || Color.blackColor;

  return <View style={{justifyContent: 'center'}}>
            <Icon name='chevron-forward-outline' style={{color: color, fontSize: mediumIconSize(), width: getDeviceStyle(16, 13)}} />
         </View>
}

export default RightArrowIcon;