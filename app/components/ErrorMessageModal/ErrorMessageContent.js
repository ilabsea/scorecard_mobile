import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';

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

    const errorMessageDictionary = {
      'ERROR_SCORECARD_EXECUTED': translations.formatString(translations.scorecardIsBeingExecuted, this.props.scorecardUuid),
      'ERROR_SCORECARD_COMPLETED': translations.formatString(translations.scorecardIsCompleted, this.props.scorecardUuid),
      'ERROR_SUBMIT_SCORECARD': translations.formatString(translations.errorSubmitScorecardMessage, this.props.scorecardUuid),
      'ERROR_DOWNLOAD_SCORECARD': translations.failedToDownloadThisScorecardInformation,
      'ERROR_SOMETHING_WENT_WRONG': translations.somethingWentWrongPleaseTryAgain,
      'default': translations.formatString(translations.scorecardIsNotExist, this.props.scorecardUuid)
    }

    return errorMessageDictionary[this.props.errorType] || errorMessageDictionary['default'];
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