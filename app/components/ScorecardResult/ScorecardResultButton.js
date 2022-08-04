import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import scorecardResultHelper from '../../helpers/scorecard_result_helper';
import { pressableItemSize } from '../../utils/component_util';
import { smallTextFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class ScorecardResultButton extends Component {
  static contextType = LocalizationContext;

  render() {
    const textColor = scorecardResultHelper.btnTextColor(this.props.isScorecardFinished, this.props.indicator, Color.blackColor);

    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={[styles.btn, this.props.btnStyle]}>
        { this.props.showDefaultLabel &&
          <Text style={[styles.text, this.props.textStyle, textColor]}>
            { this.context.translations.addText }
          </Text>
        }
        { this.props.children }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    width: '85%',
    maxWidth: getDeviceStyle(102, 90),
    height: pressableItemSize(),
    backgroundColor: '#cacaca',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    color: Color.blackColor,
    fontSize: smallTextFontSize()
  }
})

export default ScorecardResultButton;