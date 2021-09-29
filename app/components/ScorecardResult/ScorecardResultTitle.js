import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import OutlinedButton from '../OutlinedButton';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { getDeviceStyle, mobileHeadingTitleSize } from '../../utils/responsive_util';

class ScorecardResultTitle extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{ fontSize: getDeviceStyle(24, mobileHeadingTitleSize()), fontFamily: FontFamily.title }}>
            { translations.scorecardResult }
          </Text>
        </View>
        <OutlinedButton
          icon="image"
          label={translations.viewImage}
          onPress={() => this.props.navigation.navigate('SelectedImage', { scorecard_uuid: this.props.scorecardUuid }) }
        />
      </View>
    )
  }
}

export default ScorecardResultTitle;