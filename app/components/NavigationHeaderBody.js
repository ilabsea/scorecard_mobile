import React from 'react';
import { Body, Title } from "native-base";

import { FontFamily } from '../assets/stylesheets/theme/font';
import { getDeviceStyle, mobileHeadingTitleSize, navigationTitlePaddingLeft } from '../utils/responsive_util';

const NavigationHeaderBody = (props) => {
  return (
    <Body style={{flex: getDeviceStyle(2, 1), paddingLeft: navigationTitlePaddingLeft}}>
      <Title style={{fontSize: getDeviceStyle(19, mobileHeadingTitleSize()), fontFamily: FontFamily.title}}>
        { props.title }
      </Title>
    </Body>
  )
}

export default NavigationHeaderBody;