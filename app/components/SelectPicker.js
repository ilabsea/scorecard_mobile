import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../themes/color';
import {LocalizationContext} from './Translations';

import {getPickerDefaultValue} from '../services/dropdown_picker_service';

class SelectPicker extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
  }

  getDefaultValue = (items, value) => {
    const defaultValue = getPickerDefaultValue(value);
    if (defaultValue != null)
      return defaultValue;

    return items[0].value;
  }

  dropDownArrowRight = () => {
    const {translations} = this.context;
    const {showCustomArrow} = this.props;

    if (showCustomArrow) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: Color.clickableColor, textTransform: 'uppercase'}}>
            {translations['choose']}
          </Text>
          <MaterialIcon
            size={25}
            name="keyboard-arrow-down"
            style={{marginTop: -2}}
          />
        </View>
      );
    }
    else {
      return (
        <MaterialIcon
          size={25}
          name="keyboard-arrow-down"
          style={{marginTop: -2}}
        />
      );
    }
  };

  render() {
    const {translations} = this.context;
    const {label,
      items,
      selectedItem,
      placeholder,
      searchablePlaceholder,
      customLabelStyle,
      zIndex,
      onChangeItem,
    } = this.props;

    return (
      <View style={styles.dropDownContainer}>
        <Text style={[styles.inputLabel, customLabelStyle]}>
          {translations[label]}
        </Text>
        <DropDownPicker
          items={items}
          defaultValue={ items.length > 1 ? this.getDefaultValue(items, selectedItem) : null }
          placeholder={translations[placeholder]}
          searchablePlaceholder={translations[searchablePlaceholder]}
          zIndex={zIndex}
          searchable={true}
          containerStyle={styles.dropDownContainerStyle}
          style={styles.dropDownPickerStyle}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownMaxHeight={200}
          dropDownStyle={{
            backgroundColor: 'white',
            opacity: 100,
            zIndex: 6000,
          }}
          labelStyle={{fontSize: 16}}
          customArrowDown={() => this.dropDownArrowRight()}
          onChangeItem={(item) => onChangeItem(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputLabel: {
    backgroundColor: 'white',
    color: Color.inputBorderLineColor,
    fontWeight: '700',
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
  },
  dropDownContainer: {
    marginTop: 20,
    position: 'relative',
  },
  dropDownContainerStyle: {
    height: 60,
    marginTop: 10,
  },
  dropDownPickerStyle: {
    backgroundColor: 'white',
    zIndex: 5000,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 2,
    borderColor: Color.inputBorderLineColor,
  },
});

export default SelectPicker;