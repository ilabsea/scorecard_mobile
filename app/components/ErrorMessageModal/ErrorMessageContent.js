import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';

import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorMessageContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return(
      <View>
        <Text style={[CustomStyle.modalTitle, responsiveStyles.headerTitle]}>
        { translations.scorecardNotFound }
        </Text>
        <Text style={[{marginTop: 10}, responsiveStyles.label]}>
          { translations.scorecardIsNotExist }
        </Text>

        <View style={CustomStyle.modalBtnWrapper}>
          <CloseButton onPress={this.props.onDismiss} label={translations.close} />
        </View>
      </View>
    );
  }
}

export default ErrorMessageContent;