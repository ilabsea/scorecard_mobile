import React, { useState, useContext, useCallback, useEffect } from 'react';
import { Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { LocalizationContext } from '../Translations';
import CustomDropdownPickerItem from './CustomDropdownPickerItem';
import CustomDropdownPickerArrowIcon from './CustomDropdownPickerArrowIcon';
import styles from '../../themes/customDropdownPickerStyle';

export default function CustomDropdownPicker(props) {
  const { translations, appLanguage } = useContext(LocalizationContext);
  DropDownPicker.setLanguage(appLanguage);
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
    if (!!item.disabled)
      return;

    setValue(item.value);
    setOpen(false);
    props.onSelectItem(item);
  }

  function renderListItem(params) {
    if (!params.item.value && props.lastListItem)
      return props.lastListItem;

    return <CustomDropdownPickerItem params={params} showSubtitle={props.showSubtitle}
             onSelectItem={() => onSelectItem(params.item)}
           />
  }

  function renderArrowIcon() {
    return <CustomDropdownPickerArrowIcon showCustomArrow={props.showCustomArrow} open={props.open} />
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

DropDownPicker.addTranslation('km', {
  NOTHING_TO_SHOW: 'មិនមានព័ត៌មានសម្រាប់បង្ហាញ'
});

DropDownPicker.addTranslation('en', {
  NOTHING_TO_SHOW: 'Nothing available to display'
});