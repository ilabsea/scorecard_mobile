import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Color from '../../themes/color';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';

const CustomDropdownPickerItem = (props) => {
  const { params, showSubtitle } = props;

  return (
    <TouchableOpacity onPress={() => props.onSelectItem(params.item)} style={{padding: 10}}>
      <Text style={{fontSize: bodyFontSize(), color: !!params.item.disabled ? Color.lightGrayColor : Color.blackColor}}>{ params.item.label }</Text>
      { showSubtitle &&
        <Text style={{fontSize: smallTextFontSize(), color: Color.grayColor, marginTop: -10}}>{ params.item.value }</Text>
      }
    </TouchableOpacity>
  )
}

export default CustomDropdownPickerItem;