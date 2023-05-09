import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import ViewImageButton from './ViewImageButton';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import { titleFontSize } from '../../utils/font_size_util';
import Color from '../../themes/color';

class ScorecardResultTitle extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View style={{ flexDirection: 'row', padding: containerPadding, paddingTop: 0, backgroundColor: Color.defaultBgColor}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{ fontSize: getDeviceStyle(24, titleFontSize()), fontFamily: FontFamily.title }}>
            { translations.scorecardResult }
          </Text>
        </View>

        <ViewImageButton scorecardUuid={this.props.scorecardUuid} />
      </View>
    )
  }
}

export default ScorecardResultTitle;