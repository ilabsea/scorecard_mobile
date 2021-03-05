import React, { useContext } from 'react';
import { Text } from 'react-native';

import Color from '../themes/color';

import { LocalizationContext } from './Translations';

const TourTipButton = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <Text style={{color: Color.headerColor}}>{ translations[props.label] }</Text>
  )
}

export default TourTipButton;
