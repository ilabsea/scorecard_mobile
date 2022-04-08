import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

const CustomDropdownPickerArrowIcon = (props) => {
  const { translations } = useContext(LocalizationContext);

  return (
    <View style={{flexDirection: 'row'}}>
      { props.showCustomArrow &&
        <Text style={{color: Color.clickableColor, textTransform: 'uppercase', fontSize: bodyFontSize()}}>
          {translations.choose}
        </Text>
      }

      <Icon
        size={25}
        name={props.open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
        style={{marginRight: -6}}
        color={Color.blackColor}
      />
    </View>
  )
}

export default CustomDropdownPickerArrowIcon;