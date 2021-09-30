import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';

import {
  ERROR_SCORECARD_EXECUTED,
  ERROR_SCORECARD_COMPLETED,
  ERROR_SUBMIT_SCORECARD,
} from '../../constants/error_constant';
import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';
import OutlineInfoIcon from '../OutlineInfoIcon';

import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorMessageContent extends Component {
  static contextType = LocalizationContext;

  _renderErrorMessage() {
    const { translations } = this.context;

    switch (this.props.errorType) {
      case ERROR_SCORECARD_EXECUTED:
        return translations.formatString(translations.scorecardIsBeingExecuted, this.props.scorecardUuid);
      case ERROR_SCORECARD_COMPLETED:
        return translations.formatString(translations.scorecardIsCompleted, this.props.scorecardUuid);
      case ERROR_SUBMIT_SCORECARD:
        return translations.formatString(translations.errorSubmitScorecardMessage, this.props.scorecardUuid);
      default:
        return translations.formatString(translations.scorecardIsNotExist, this.props.scorecardUuid);
    }
  }

  render() {
    const { translations } = this.context;

    return(
      <View>
        <View style={{ flexDirection: 'row' }}>
          <OutlineInfoIcon color={Color.warningColor} />

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={responsiveStyles.label}>
              { this._renderErrorMessage() }
            </Text>
          </View>
        </View>

        <View style={[CustomStyle.modalBtnWrapper, { marginTop: 8 }]}>
          <CloseButton onPress={this.props.onDismiss} label={translations.infoCloseLabel} />
        </View>
      </View>
    );
  }
}

export default ErrorMessageContent;