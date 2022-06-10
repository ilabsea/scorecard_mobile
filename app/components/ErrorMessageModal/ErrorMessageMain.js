import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';
import ErrorMessageHeader from './ErrorMessageHeader';

import { getReadableAppLanguage } from '../../utils/translation_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorMessageMain extends Component {
  static contextType = LocalizationContext;

  errorMessage() {
    const { translations, appLanguage } = this.context;
    const scorecardCode = <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>

    const errorMessageDictionary = {
      'ERROR_SCORECARD_EXECUTED': {
        title: translations.scorecardIsExecuted,
        description: translations.formatString(translations.scorecardIsBeingExecuted, scorecardCode)
      },
      'ERROR_SCORECARD_COMPLETED': {
        title: translations.scorecardIsCompleted,
        description: translations.formatString(translations.scorecardIsCompletedMessage, scorecardCode)
      },
      'ERROR_SUBMIT_SCORECARD': {
        title: translations.scorecardIsSubmitted,
        description: translations.formatString(translations.errorSubmitScorecardMessage, scorecardCode)
      },
      'ERROR_DOWNLOAD_SCORECARD': {
        title: translations.failedToDownloadScorecard,
        description: translations.failedToDownloadThisScorecardInformation
      },
      'ERROR_SOMETHING_WENT_WRONG': {
        title: translations.somethingWentWrong,
        description: translations.somethingWentWrongPleaseTryAgain
      },
      'ERROR_DOWNLOAD_PDF': {
        title: translations.unableToDownloadThePdfFile,
        description: translations.formatString(translations.thePdfFileOfThisLanguageIsNotAvailableToDownload, getReadableAppLanguage(appLanguage))
      },
      'ERROR_INVALID_SCORECARD_URL': {
        title: translations.invalidUrl,
        description: translations.theUrlThatYouCopiedIsInvalid
      },
      'ERROR_NETWORK_AUTHENTICATION': {
        title: translations.somethingWentWrong,
        description: translations.somethingWentWrongPleaseTryAgain
      },
      'ERROR_INCORRECT_SCORECARD_CODE': {
        title: translations.incorrectScorecardCode,
        description: translations.formatString(translations.thisScorecardCodeIsIncorrect, scorecardCode)
      },
      'ERROR_SHARE_PDF_MISMATCH_ENDPOINT': {
        title: translations.theServerUrlHasBeenChanged,
        description: translations.sharePDFMismatchEndpointMessage
      },
      'default': {
        title: translations.theScorecardIsNotExist,
        description: translations.formatString(translations.thisScorecardIsNotExist, scorecardCode)
      }
    }

    return errorMessageDictionary[this.props.errorType] || errorMessageDictionary['default'];
  }

  render() {
    const { translations, appLanguage } = this.context;
    const errorMessage = this.errorMessage();

    return(
      <View>
        <ErrorMessageHeader title={errorMessage.title} />

        <View style={{marginBottom: 10, marginTop: appLanguage == 'km' ? 20 : 15}}>
          <Text style={[responsiveStyles.label, { textAlign: 'center' }]}>
            { !!this.props.message ?
              this.props.message
              : errorMessage.description
            }
          </Text>
        </View>

        <View style={[CustomStyle.modalBtnWrapper, { marginTop: 8 }]}>
          <CloseButton onPress={this.props.onDismiss} label={translations.infoCloseLabel} />
        </View>
      </View>
    );
  }
}

export default ErrorMessageMain;