import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';
const modalStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ScorecardProgressConfirmFinishContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={modalStyles.label}>
          {translations.formatString(translations.thisScorecardWillBeLocked, this.props.scorecardUuid)}
        </Text>
        <Text style={[{ marginTop: 12 }, , modalStyles.label]}>
          {translations.formatString(translations.areYouSureYouWantToFinish, this.props.scorecardUuid)}
        </Text>
      </View>
    )
  }
}

export default ScorecardProgressConfirmFinishContent;