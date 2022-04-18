import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import { bodyFontSize, smallTextFontSize } from '../../utils/font_size_util';

const CustomDropdownPickerItem = (props) => {
  const { params, showSubtitle } = props;

  return (
    <TouchableOpacity onPress={() => props.onSelectItem(params.item)} style={{padding: 10, flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: bodyFontSize(), color: !!params.item.disabled ? Color.lightGrayColor : Color.blackColor}}>{ params.item.label }</Text>
        { showSubtitle &&
          <Text style={{fontSize: smallTextFontSize(), color: Color.grayColor, marginTop: -10}}>{ params.item.value }</Text>
        }
      </View>

      { props.selectedItem == props.params.item.value &&
        <Icon size={22} name='check' color={Color.clickableColor} style={{ alignSelf: 'center' }} />
      }
    </TouchableOpacity>
  )
}

export default CustomDropdownPickerItem;