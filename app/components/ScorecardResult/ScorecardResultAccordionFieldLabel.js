import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import { smLabelSize } from '../../constants/mobile_font_size_constant';

const ScorecardResultAccordionFieldLabel = (props) => {
  const { translations } = useContext(LocalizationContext);

  if (props.fieldName == 'suggested_action') {
    const textStyle = { fontSize: wp(smLabelSize), alignSelf: 'center' };

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