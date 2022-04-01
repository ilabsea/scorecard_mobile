import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import scorecardResultHelper from '../../helpers/scorecard_result_helper';

class ScorecardResultAddButton extends Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={{alignItems: 'center'}}>
        <View style={this.props.btnStyle}>
          <Text style={[this.props.textStyle, scorecardResultHelper.btnTextColor(this.props.isScorecardFinished, this.props.indicator, Color.blackColor)]}>
            { this.context.translations.addText }
          </Text>

          { this.props.children }
        </View>
      </TouchableOpacity>
    )
  }
}

export default ScorecardResultAddButton;