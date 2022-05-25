import React, { useContext } from 'react';
import { Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import { smallTextFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';

const WarningMessage = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <Text style={{ fontSize: smallTextFontSize(), color: Color.redColor, paddingHorizontal: containerPadding }}>
      { translations.cannotEditOrDeleteThisServerUrl }
    </Text>
  )
}

export default WarningMessage;