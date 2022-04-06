import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Color from '../themes/color';
import { bodyFontSize, smallTextFontSize } from '../utils/font_size_util';

export default function CustomSelectPicker(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.selectedItem);
  const [items, setItems] = useState(props.items);

  function onSelectItem(item) {
    setValue(item.value);
    setOpen(false);
    props.onSelectItem(item);
  }

  function renderListItem(params) {
    return (
      <TouchableOpacity onPress={() => onSelectItem(params.item)} style={{padding: 10}}>
        <Text style={{fontSize: bodyFontSize()}}>{ params.item.label }</Text>
        <Text style={{fontSize: smallTextFontSize(), color: Color.grayColor, marginTop: -10}}>{ params.item.value }</Text>
      </TouchableOpacity>
    )
  }

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      open={open}
      value={value}
      items={items}
      setValue={setValue}
      setItems={setItems}
      setOpen={setOpen}
      renderListItem={renderListItem}
    />
  );
}