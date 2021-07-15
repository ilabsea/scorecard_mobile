import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';

class FilterScorecard extends Component {
  renderFilterOption(options) {
    const titleSize = getDeviceStyle(16, wp(mdLabelSize));

    return (
      <View>
        <Text style={{paddingHorizontal: 16, paddingVertical:10, fontSize: titleSize}}>ដំណាក់កាល</Text>
        <View style={{backgroundColor: Color.whiteColor}}>
          { this.renderOptionList(options) }
        </View>
      </View>
    )
  }

  renderOptionList(options) {
    return options.map((option, index) => {
      return (
        <View>
          <TouchableOpacity style={{flexDirection: 'row', paddingHorizontal: 25, paddingVertical: 10, alignItems: 'center'}}>
            <Text style={{flex: 1}}>{ option.label }</Text>

            <AppIcon name='check-circle' size={24} color={Color.successColor} />
          </TouchableOpacity>
          { index < options.length - 1 && <Divider style={{backgroundColor: '#b3b3b3'}} /> }
        </View>
      )
    });
  }

  // renderLocationList() {

  // }

  render() {
    const statuses = [
      { label: 'In progress', value: 'in-progress' },
      { label: 'Finished', value: 'finished' },
      { label: 'Sumitted', value: 'submitted' }
    ];
    const scorecardTypes = [
      { label: 'Self-assessment', value: 'self-assessment'},
      { label: 'community scorecard', value: 'community-scorecard'}];

    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#eee'}}>
          { this.renderFilterOption(statuses) }

          { this.renderFilterOption(scorecardTypes) }
        </ScrollView>
      </View>
    )
  }
}

export default FilterScorecard;