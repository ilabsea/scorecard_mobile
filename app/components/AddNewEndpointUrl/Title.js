import React from 'react';
import {LocalizationContext} from '../Translations';
import Color from '../../themes/color';
import styles from '../../themes/modalStyle';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';

const Title = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={{ padding: containerPadding, paddingBottom: 5}}>
      <Text style={[styles.title, { fontSize: bodyFontSize() }]}>{ translations.pleaseEnterInformationBelow }</Text>
    </View>
  )
}

export default Title;