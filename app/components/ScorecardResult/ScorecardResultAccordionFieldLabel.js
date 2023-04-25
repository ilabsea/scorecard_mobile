import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import BoldLabel from '../Share/BoldLabel';
import Color from '../../themes/color';
import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';
import { accordionItemFontSize } from '../../utils/font_size_util'

const ScorecardResultAccordionFieldLabel = (props) => {
  const { translations } = useContext(LocalizationContext);
  const renderInputtedItem = () => {
    if (!!props.indicator[props.fieldName]) {
      const inputtedItem = <BoldLabel label={JSON.parse(props.indicator[props.fieldName]).length} customStyle={{fontSize: 12, color: Color.grayColor}} />
      return  <Text style={styles.itemSubtitleText}>{translations.formatString(translations.inputted, inputtedItem)}</Text>
    }
  } 

  if (props.fieldName == 'suggested_action') {
    const textStyle = { fontSize: accordionItemFontSize(), alignSelf: 'center' };

    return (
      <View style={{flexGrow: 1}}>
        <View style={{flexDirection: "row"}}>
          <Text style={textStyle}>{ translations[props.fieldName] }</Text>
          <Text style={[textStyle, props.isRequired ? { color: Color.redColor } : {}]}> *</Text>
        </View>
        {renderInputtedItem()}
      </View>
    )
  }

  return <View style={{flex: 3, justifyContent: 'center'}}>
            <Text style={styles.itemTitleText}>{translations[props.fieldName]}</Text>
            {renderInputtedItem()}
         </View>
}
export default ScorecardResultAccordionFieldLabel;