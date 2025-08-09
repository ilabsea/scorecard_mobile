import React from 'react';
import { Text, View } from 'react-native';

import { FontFamily } from '../assets/stylesheets/theme/font';
import { getDeviceStyle, navigationTitlePaddingLeft } from '../utils/responsive_util';
import { navigationHeaderTitleFontSize } from '../utils/font_size_util';

const NavigationHeaderBody = (props) => {
  return (
    <View style={{flex: getDeviceStyle(2, 1), paddingLeft: navigationTitlePaddingLeft, alignItems: 'flex-start', marginLeft: 0}}>
      <Text style={{fontSize: navigationHeaderTitleFontSize(), fontFamily: FontFamily.title, textTransform: 'capitalize', color: 'white'}}>
        { props.title }
      </Text>
    </View>
  )
}

export default NavigationHeaderBody;