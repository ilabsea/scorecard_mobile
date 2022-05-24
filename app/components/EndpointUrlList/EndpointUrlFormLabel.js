import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import styles from '../../themes/modalStyle';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';

export const EndpointUrlTitle = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={{ padding: containerPadding, paddingBottom: 5}}>
      <Text style={[styles.title, { fontSize: bodyFontSize() }]}>{ translations.pleaseEnterInformationBelow }</Text>
    </View>
  )
}

export const EndpointUrlFormWarningMessage = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <Text style={{ fontSize: smallTextFontSize(), color: Color.redColor, paddingHorizontal: containerPadding }}>
      { translations.cannotEditOrDeleteThisServerUrl }
    </Text>
  )
}