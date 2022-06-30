import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import FilterScorecardCheckIcon from './FilterScorecardCheckIcon';
import Color from '../../themes/color';
import listItemStyles from '../../themes/listItemStyle';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import uuidv4 from '../../utils/uuidv4';
import { bodyFontSize } from '../../utils/font_size_util';

class FilterOption extends Component {
  static contextType = LocalizationContext;

  isSelected(value) {
    if (this.props.selectedItems.length > 0)
      return this.props.selectedItems.includes(value);

    return false;
  }

  renderOptionList() {
    const { translations } = this.context;

    return this.props.options.map((option, index) => {
      return (
        <View key={uuidv4()}>
          <TouchableOpacity onPress={() => this.props.onSelectItem(option.value)}
            style={listItemStyles.filterListItem}
          >
            <Text style={{flex: 1, fontSize: bodyFontSize()}}>{ translations[option.label] }</Text>

            { this.isSelected(option.value) && <FilterScorecardCheckIcon /> }
          </TouchableOpacity>
          { index < this.props.options.length - 1 && <Divider style={{backgroundColor: '#b3b3b3'}} /> }
        </View>
      )
    });
  }

  render() {
    return (
      <View style={[this.props.containerStyle, { backgroundColor: Color.whiteColor }]}>
        <View style={{paddingHorizontal: 16, paddingVertical: 10, backgroundColor: Color.whiteColor, justifyContent: 'center'}}>
          <Text style={{fontSize: bodyFontSize(), fontFamily: FontFamily.title}}>
            { this.props.title }
          </Text>
        </View>

        { this.renderOptionList() }
      </View>
    )
  }
}

export default FilterOption;