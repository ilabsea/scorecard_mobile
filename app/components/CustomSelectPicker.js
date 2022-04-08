import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from './Translations';
import Color from '../themes/color';
import styles from '../themes/selectPickerStyle';
import { bodyFontSize, smallTextFontSize } from '../utils/font_size_util';

export default function CustomSelectPicker(props) {
  const { translations } = useContext(LocalizationContext);
  const [open] = useState(false);
  const [value, setValue] = useState(props.selectedItem);
  const [items, setItems] = useState(props.items);

  const setOpen = useCallback((open) => {
    props.setOpenId(open ? props.id : null);
  }, []);

  useEffect(() => {
    setItems(props.items);

    if (value !== props.selectedItem)
      setValue(props.selectedItem);
  }, [props.selectedItem, props.items]);

  function onSelectItem(item) {
    setValue(item.value);
    setOpen(false);
    props.onSelectItem(item);
  }

  function renderListItem(params) {
    return (
      <TouchableOpacity onPress={() => onSelectItem(params.item)} style={{padding: 10}}>
        <Text style={{fontSize: bodyFontSize()}}>{ params.item.label }</Text>
        { props.showSubtitle &&
          <Text style={{fontSize: smallTextFontSize(), color: Color.grayColor, marginTop: -10}}>{ params.item.value }</Text>
        }
      </TouchableOpacity>
    )
  }

  function renderArrowIcon() {
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

  function getLabel() {
    const {label, isRequire, itemIndex} = props;
    const indexLabel = itemIndex != 0 ? itemIndex : '';
    if (isRequire) return label + ' ' + indexLabel + ' *';

    return label + ' ' + indexLabel;
  };

  const titleZindex = parseInt(props.zIndex) + 1;
  const unselectedBorderStyle = !!props.unselectedBorder ? props.unselectedBorder : styles.unselectedBorder;

  return (
    <View style={[ styles.wrapperContainer, props.customWrapperStyle ]}>
      <Text style={[styles.titleLabel, { zIndex: titleZindex }]}>
        { getLabel() }
      </Text>

      <DropDownPicker
        {...props}
        listMode="SCROLLVIEW"
        open={props.openId === props.id}
        value={value}
        items={items}
        setValue={setValue}
        setItems={setItems}
        setOpen={setOpen}
        zIndex={props.zIndex}
        style={[styles.mainContainer, props.customMainContainerStyle, props.openId === props.id ? styles.selectedBorder : unselectedBorderStyle ]}
        dropDownContainerStyle={styles.dropDownContainer}
        renderListItem={renderListItem}
        ArrowUpIconComponent={renderArrowIcon}
        ArrowDownIconComponent={renderArrowIcon}
        disabled={props.disabled}
        disabledStyle={{ opacity: 0.5 }}
        onOpen={() => !!props.onOpen && props.onOpen()}
        onClose={() => !!props.onClose && props.onClose()}
      />
    </View>
  );
}