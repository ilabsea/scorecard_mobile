import React from 'react';
import { Text } from 'react-native';
import settingHelper from '../helpers/setting_helper';
import Color from '../themes/color';
import { getReadableAppLanguage } from './translation_util';

const getErrorObject = (error) => {
  let errorObject = {
    status: '',
    message: error.toJSON().message,
  };

  if (error.response != undefined)
    errorObject.status = error.response.status;
  else {
    errorObject.status = 511;
  }

  return errorObject;
}

const getApiRequestErrorMessage = async (errorType, scorecardUuid, unlockAt, localization) => {
  const settingData = await settingHelper.getSettingData();
  const backendUrl = settingData.backendUrl || '';
  const scorecardCode = _textLabel(scorecardUuid);
  const endpoint = _textLabel(backendUrl, 'blue')
  const { translations, app_language } = localization

  // console.log('error type == ', errorType);

  const errors = {
    'ERROR_NOT_FOUND': {
      title: translations.unableToSubmitTheScorecard,
      description: translations.formatString(translations.cannotSubmitScorecardErrorMsg, endpoint, scorecardCode)
    },
    'ERROR_SCORECARD_NOT_EXIST': {
      title: translations.thisScorecardIsNotExist,
      description: translations.formatString(translations.scorecardIsNotExist, scorecardCode)
    },
    'ERROR_UNAUTHORIZED': {
      title: translations.invalidScorecard,
      description: translations.formatString(translations.unauthorizedScorecardMessage, scorecardCode)
    },
    'ERROR_SCORECARD_EXECUTED': {
      title: translations.scorecardIsExecuted,
      description: translations.formatString(translations.scorecardIsBeingExecuted, scorecardCode)
    },
    'ERROR_SCORECARD_COMPLETED': {
      title: translations.scorecardIsCompleted,
      description: translations.formatString(translations.scorecardIsCompletedMessage, scorecardCode)
    },
    'ERROR_SUBMIT_SCORECARD': {
      title: translations.failedToSubmitTheScorecard,
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
      title: translations.unableToShare,
      description: translations.formatString(translations.thePdfFileOfThisLanguageIsNotAvailableToDownload, getReadableAppLanguage(app_language))
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
    'LOCKED': {
      title: translations.yourDeviceIsLocked,
      description: translations.formatString(translations.yourDeviceIsCurrentlyLocked, _textLabel(unlockAt)),
    },
    'DEFAULT': {
      title: translations.somethingWentWrong,
      description: translations.formatString(translations.somethingWentWrongMessage, endpoint)
    }
  };

  if (!!unlockAt)
    return errors.LOCKED;

  return errors[errorType.toString()] || errors.DEFAULT;
}

const _textLabel = (label, color = Color.blackColor) => {
  return <Text style={{fontWeight: 'bold', color: color}}>{ label }</Text>
}

export { getErrorObject, getApiRequestErrorMessage };