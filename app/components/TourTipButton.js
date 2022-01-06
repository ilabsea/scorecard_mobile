import React, { useContext } from 'react';
import { Text } from 'react-native';

import Color from '../themes/color';
import { bodyFontSize } from '../utils/font_size_util';

import { LocalizationContext } from './Translations';

const TourTipButton = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <Text style={{color: Color.headerColor, fontSize: bodyFontSize()}}>{ translations[props.label] }</Text>
  )
}

export default TourTipButton;
