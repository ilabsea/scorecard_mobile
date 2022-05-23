import React from 'react';
import {Icon} from 'native-base';

import Color from '../../themes/color';
import { mediumIconSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

const ArrowRightIcon = () => {
  return (
    <Icon name='chevron-forward-outline'
      style={{color: Color.headerColor, fontSize: mediumIconSize(), width: getDeviceStyle(16, 13)}}
    />
  )
}

export default ArrowRightIcon;