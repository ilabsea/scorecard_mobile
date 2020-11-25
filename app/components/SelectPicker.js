import React, {Component} from 'react';
import {View, Text, StyleSheet, InteractionManager} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../themes/color';
import {LocalizationContext} from './Translations';

class SelectPicker extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
  }

  getDefaultValue = (items, value) => {
    if (items.length === 0) return null;

    if (value != '' && value != undefined) return value.toString();

    if (this.props.mustHasDefaultValue) return items[0].value;

    return null;
  };

  dropDownArrowRight = () => {
    const {translations} = this.context;
    const {showCustomArrow} = this.props;

    if (showCustomArrow) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{color: Color.clickableColor, textTransform: 'uppercase'}}>
            {translations['choose']}
          </Text>
          <MaterialIcon
            size={25}
            name="keyboard-arrow-down"
            style={{marginTop: -2}}
          />
        </View>
      );
    } else {
      return (
        <MaterialIcon
          size={25}
          name="keyboard-arrow-down"
          style={{marginTop: -2}}
        />
      );
    }
  };

  dropDownZindex = (zIndex) => {
    return {zIndex: zIndex};
  };

  getLabel = () => {
    const {label, isRequire, itemIndex} = this.props;
    const indexLabel = itemIndex != undefined ? itemIndex : '';
    if (isRequire) return label + ' ' + indexLabel + ' *';

    return label + ' ' + indexLabel;
  };

  render() {
    const {
      items,
      selectedItem,
      placeholder,
      searchablePlaceholder,
      customLabelStyle,
      customDropDownContainerStyle,
      zIndex,
      onChangeItem,
      customContainerStyle,
      isSearchable,
    } = this.props;

    return (
      <View style={[styles.dropDownContainer, customDropDownContainerStyle]}>
        <Text style={[styles.inputLabel, customLabelStyle]}>
          {this.getLabel()}
        </Text>
        <DropDownPicker
          items={items}
          defaultValue={this.getDefaultValue(items, selectedItem)}
          placeholder={placeholder}
          searchablePlaceholder={searchablePlaceholder}
          zIndex={zIndex}
          searchable={isSearchable != undefined ? isSearchable : true}
          containerStyle={[styles.dropDownContainerStyle, customContainerStyle]}
          style={styles.dropDownPickerStyle}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownMaxHeight={250}
          dropDownStyle={[{backgroundColor: 'white', opacity: 100}, this.dropDownZindex(zIndex)]}
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
