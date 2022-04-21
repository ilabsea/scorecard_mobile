import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, Item, Icon } from 'native-base';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { pressableItemSize } from '../../utils/component_util';
import { bodyFontSize } from '../../utils/font_size_util';

import { LocalizationContext } from '../../components/Translations';

class LocationSearchBox extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const placeholderColor = '#676767';

    return (
      <View style={styles.container}>
        <Item rounded style={styles.inputContainer}>
          <Icon name="search" style={{fontSize: 22, paddingLeft: 10, paddingRight: 0, marginTop: 0, color: placeholderColor}} />
          <Input
            placeholder={ translations.searchLocation }
            value={this.props.searchedLocation}
            clearButtonMode='always'
            style={styles.searchInput}
            onChangeText={(text) => this.props.onChangeText(text)}
            onFocus={() => this.props.updateFocusStatus(true)}
            onBlur={() => this.props.updateFocusStatus(false)}
            placeholderTextColor={placeholderColor}
          />

          { !!this.props.searchedLocation &&
            <TouchableOpacity onPress={() => this.props.onClearSearch()} style={{justifyContent: 'center', width: pressableItemSize(), alignItems: 'center'}}>
              <Icon name="close" style={{fontSize: 28, paddingLeft: 0, paddingRight: 0, marginTop: 0, color: Color.grayColor}} />
            </TouchableOpacity>
          }
        </Item>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    borderColor: '#bababa',
    flex: 1,
    backgroundColor: Color.paleGrayColor,
  },
  container: {
    backgroundColor: Color.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Color.paleGrayColor,
    flexDirection: 'row',
  },
  searchInput: {
    fontFamily: FontFamily.body,
    fontSize: bodyFontSize(),
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    marginRight: 2
  }
});

export default LocationSearchBox;