import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';

class ErrorScorecardContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return(
      <View>
        <Text style={CustomStyle.modalTitle}>{translations.scorecardNotFound}</Text>
        <Text style={{marginTop: 10}}>
          {translations.scorecardIsNotExist}
        </Text>

        <View style={CustomStyle.modalBtnWrapper}>
          <CloseButton onPress={this.props.onDismiss} label={translations.close} />
        </View>
      </View>
    );
  }
}

export default ErrorScorecardContent;