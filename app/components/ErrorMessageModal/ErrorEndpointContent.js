import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import CloseButton from '../CloseButton';

import { LocalizationContext } from '../Translations';

class ErrorEndpointContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={CustomStyle.modalTitle}>
          { this.props.isSubmit ? translations.scorecardSubmitFailed : translations.scorecardDownloadFailed }
        </Text>
        <Text style={{marginTop: 10}}>
          {translations.cscAppCannotReachTheServerAt} <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>.
          {translations.didYouEnterTheUrlCorrectly}
          {translations.ifYouKeepHavingThisProblem}
        </Text>

        <View style={CustomStyle.modalBtnWrapper}>
          <CloseButton onPress={this.props.onDismiss} label={translations.close} />
        </View>
      </View>
    );
  }
}

export default ErrorEndpointContent;