import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import { accordionItemFontSize } from '../../utils/font_size_util'

const ScorecardResultAccordionFieldLabel = (props) => {
  const { translations } = useContext(LocalizationContext);

  if (props.fieldName == 'suggested_action') {
    const textStyle = { fontSize: accordionItemFontSize(), alignSelf: 'center' };

    return (
      <View style={{flexDirection: "row", flexGrow: 1}}>
        <Text style={textStyle}>
          { translations[props.fieldName] }
        </Text>
        <Text style={[textStyle, props.isRequired ? { color: Color.redColor } : {}]}> *</Text>
      </View>
    )
  }

  return <Text style={styles.itemTitleText}>{translations[props.fieldName]}</Text>
}

export default ScorecardResultAccordionFieldLabel;