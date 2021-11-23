import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';
import CloseButton from '../CloseButton';

import { LocalizationContext } from '../Translations';
import OutlineInfoIcon from '../OutlineInfoIcon';
import { ERROR_NOT_FOUND, ERROR_UNAUTHORIZED } from '../../constants/error_constant';

import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorRequestToServerContent extends Component {
  static contextType = LocalizationContext;

  _scorecardCode() {
    return <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>
  }

  _renderNotFoundContent() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={responsiveStyles.label}>{translations.cannotSubmitThisScorecard}: </Text>
        <Text style={responsiveStyles.label}>
          {translations.cscAppCannotReachTheServerAt} <Text style={{color: 'blue'}}>{this.props.backendUrl} </Text>
          { translations.formatString(translations.scorecardDeletedPleaseContactAdministrator, this._scorecardCode()) }
        </Text>
      </View>
    );
  }

  _renderErrorEndpointContent() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={responsiveStyles.label}>
          {translations.cscAppCannotReachTheServerAt} <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>{translations.fullStopSign}
        </Text>
        <Text style={[{marginTop: 10}, responsiveStyles.label]}>
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
        <Text style={responsiveStyles.label}>
          { translations.formatString(translations.unauthorizedScorecardMessage, this._scorecardCode()) }
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
        <View style={{flexDirection: 'row'}}>
          <OutlineInfoIcon color={Color.warningColor} />

          <View style={{flex: 1, justifyContent: 'center'}}>
            { this._renderContent() }
          </View>
        </View>

        <View style={[CustomStyle.modalBtnWrapper, { marginTop: 8 }]}>
          <CloseButton onPress={this.props.onDismiss} label={translations.close} />
        </View>
      </View>
    );
  }
}

export default ErrorRequestToServerContent;