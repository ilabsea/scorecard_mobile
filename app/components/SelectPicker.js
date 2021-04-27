import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../themes/color';
import { LocalizationContext } from './Translations';

import { normalLabelSize } from '../utils/responsive_util';

class SelectPicker extends Component {
  static contextType = LocalizationContext;

  getDefaultValue = (items, value) => {
    if (items.length === 0) return null;

    if (value != '' && value != undefined) return value.toString();

    if (this.props.mustHasDefaultValue) return items[0].value;

    return null;
  };

  dropDownArrowRight = () => {
    const { translations } = this.context;
    const { showCustomArrow } = this.props;

    return (
      <View style={{flexDirection: 'row'}}>
        { showCustomArrow &&
          <Text
            style={{color: Color.clickableColor, textTransform: 'uppercase', fontSize: normalLabelSize}}>
            {translations['choose']}
          </Text>
        }

        <MaterialIcon
          size={25}
          name="keyboard-arrow-down"
          style={{marginTop: -2}}
          color="black"
        />
      </View>
    );
  };

  getLabel = () => {
    const {label, isRequire, itemIndex} = this.props;
    const indexLabel = itemIndex != 0 ? itemIndex : '';
    if (isRequire) return label + ' ' + indexLabel + ' *';

    return label + ' ' + indexLabel;
  };

  render() {
    const { translations } = this.context;
    const {
      items,
      selectedItem,
      zIndex,
      customLabelStyle,
      customDropDownContainerStyle,
      onChangeItem,
      customContainerStyle,
    } = this.props;

    return (
      <View style={[styles.dropDownContainer, customDropDownContainerStyle]}>
        <Text style={[styles.inputLabel, {zIndex: (zIndex + 1)}, customLabelStyle]}>
          { this.getLabel() }
        </Text>

        <DropDownPicker
          { ...this.props }
          defaultValue={this.getDefaultValue(items, selectedItem)}
          containerStyle={[styles.dropDownContainerStyle, customContainerStyle]}
          style={styles.dropDownPickerStyle}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownMaxHeight={200}
          dropDownStyle={[{backgroundColor: 'white', zIndex: zIndex}]}
          labelStyle={{fontSize: normalLabelSize}}
          customArrowDown={() => this.dropDownArrowRight()}
          searchableError={() => <Text style={{ fontSize: normalLabelSize }}>{ translations.noData }</Text>}
        />
      </View>
    );
  }
}

SelectPicker.defaultProps = {
  items: [],
  selectedItem: '',
  placeholder: '',
  searchablePlaceholder: '',
  searchable: false,
  customLabelStyle: {},
  customDropDownContainerStyle: {},
  zIndex: 1,
  onChangeItem: () => {},
  itemIndex: 0,
  mustHasDefaultValue: false,
  showCustomArrow: true,
};

const styles = StyleSheet.create({
  inputLabel: {
    backgroundColor: 'white',
    color: Color.inputBorderLineColor,
    fontSize: 12,
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
