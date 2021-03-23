import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import CloseButton from '../CloseButton';

import { LocalizationContext } from '../Translations';
import { ERROR_NOT_FOUND } from '../../constants/error_constant';

class ErrorRequestToServerContent extends Component {
  static contextType = LocalizationContext;

  _renderNotFoundContent() {
    const { translations } = this.context;

    return (
      <View>
        <Text>{translations.cannotSubmitThisScorecard}: </Text>
        <Text>
          {translations.cscAppCannotReachTheServerAt} <Text style={{color: 'blue'}}>{this.props.backendUrl} </Text>
          {translations.scorecardDeletedPleaseContactAdministrator}
        </Text>
      </View>
    );
  }

  _renderErrorEndpointContent() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={{marginTop: 10}}>
          {translations.cscAppCannotReachTheServerAt} <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>{translations.fullStopSign}
          {translations.didYouEnterTheUrlCorrectly}
          {translations.ifYouKeepHavingThisProblem}
        </Text>
      </View>
    )
  }

  _renderContent() {
    if (this.props.errorType == ERROR_NOT_FOUND) {
      return this._renderNotFoundContent()
    }

    return this._renderErrorEndpointContent();
  }

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={CustomStyle.modalTitle}>
          { this.props.isSubmit ? translations.scorecardSubmitFailed : translations.scorecardDownloadFailed }
        </Text>

        { this._renderContent() }

        <View style={CustomStyle.modalBtnWrapper}>
          <CloseButton onPress={this.props.onDismiss} label={translations.close} />
        </View>
      </View>
    );
  }
}

export default ErrorRequestToServerContent;