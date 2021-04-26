import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import CloseButton from '../CloseButton';

import { LocalizationContext } from '../Translations';
import { ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '../../constants/error_constant';

import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../assets/stylesheets/tablet/PopupModalStyle';
import PopupModalMobileStyles from '../../assets/stylesheets/mobile/PopupModalStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorRequestToServerContent extends Component {
  static contextType = LocalizationContext;

  _renderNotFoundContent() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={responsiveStyles.label}>{translations.cannotSubmitThisScorecard}: </Text>
        <Text style={responsiveStyles.label}>
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
        <Text style={[{marginTop: 10}, responsiveStyles.label]}>
          {translations.cscAppCannotReachTheServerAt} <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>{translations.fullStopSign}
        </Text>
        <Text style={[{marginTop: 20}, responsiveStyles.label]}>
          {translations.didYouEnterTheUrlCorrectly}
          {translations.ifYouKeepHavingThisProblem}
        </Text>
      </View>
    )
  }

  _renderUnauthorizedContent() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={[{marginTop: 10}, responsiveStyles.label]}>
          {translations.unauthorizedScorecardMessage}
        </Text>
      </View>
    );
  }

  _renderContent() {
    if (this.props.errorType == ERROR_NOT_FOUND)
      return this._renderNotFoundContent()
    else if (this.props.errorType == ERROR_UNAUTHORIZED)
      return this._renderUnauthorizedContent();

    return this._renderErrorEndpointContent();
  }

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={[CustomStyle.modalTitle, responsiveStyles.headerTitle]}>
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