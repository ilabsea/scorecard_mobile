import React from 'react';
import { Body, Title } from "native-base";

import { FontFamily } from '../assets/stylesheets/theme/font';
import { getDeviceStyle, navigationTitlePaddingLeft } from '../utils/responsive_util';
import { navigationHeaderTitleFontSize } from '../utils/font_size_util';

const NavigationHeaderBody = (props) => {
  return (
    <Body style={{flex: getDeviceStyle(2, 1), paddingLeft: navigationTitlePaddingLeft}}>
      <Title style={{fontSize: navigationHeaderTitleFontSize(), fontFamily: FontFamily.title, textTransform: 'capitalize'}}>
        { props.title }
      </Title>
    </Body>
  )
}

export default NavigationHeaderBody;