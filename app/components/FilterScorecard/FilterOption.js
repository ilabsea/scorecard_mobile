import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import FilterScorecardCheckIcon from './FilterScorecardCheckIcon';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { getDeviceStyle } from '../../utils/responsive_util';
import uuidv4 from '../../utils/uuidv4';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';

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
            style={{flexDirection: 'row', paddingRight: 25, paddingLeft: 30, paddingVertical: 10, alignItems: 'center'}}
          >
            <Text style={{flex: 1, fontSize: getDeviceStyle(16, wp(mdLabelSize))}}>{ translations[option.label] }</Text>

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
        <Text style={{paddingHorizontal: 16, paddingVertical: 10, fontSize: getDeviceStyle(16, wp(mdLabelSize)), fontFamily: FontFamily.title, backgroundColor: Color.whiteColor}}>
          { this.props.title }
        </Text>
        { this.renderOptionList() }
      </View>
    )
  }
}

export default FilterOption;