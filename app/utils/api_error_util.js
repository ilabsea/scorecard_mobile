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
  const { translations, app_language } = localization

  // console.log('error type == ', errorType);

  const errors = {
    'ERROR_NOT_FOUND': {
      title: 'Invalid scorecard (scorecard not found)',
      description: `Unable to submit this scorecard, the reason may be due to: CSC app cannot reach the server at ${ backendUrl } or this scorecard(${ scorecardUuid }) is deleted in the server. Please contact the program administrator for more detail.`
    },
    'ERROR_SCORECARD_NOT_EXIST': {
      title: 'Scorecard is not exist',
      description: translations.formatString(translations.scorecardIsNotExist, scorecardCode)
    },
    'ERROR_UNAUTHORIZED': {
      title: 'Invalid scorecard',
      description: `This scorecard(${ scorecardCode }) is invalid. Please contact to the program administrator for more detail.`
    },
    'ERROR_SCORECARD_EXECUTED': {
      title: 'Scorecard is executed',
      description: translations.formatString(translations.scorecardIsBeingExecuted, scorecardCode)
    },
    'ERROR_SCORECARD_COMPLETED': {
      title: 'Scorecard is completed',
      description: translations.formatString(translations.scorecardIsCompleted, scorecardCode)
    },
    'ERROR_SUBMIT_SCORECARD': {
      title: 'Cannot submit the scorecard',
      description: translations.formatString(translations.errorSubmitScorecardMessage, scorecardCode)
    },
    'ERROR_DOWNLOAD_SCORECARD': {
      title: 'Cannot download the scorecard',
      description: translations.failedToDownloadThisScorecardInformation
    },
    'ERROR_SOMETHING_WENT_WRONG': {
      title: 'Something went wrong',
      description: translations.somethingWentWrongPleaseTryAgain
    },
    'ERROR_DOWNLOAD_PDF': {
      title: 'Cannot share the scorecard',
      description: translations.formatString(translations.thePdfFileOfThisLanguageIsNotAvailableToDownload, getReadableAppLanguage(app_language))
    },
    'ERROR_INVALID_SCORECARD_URL': {
      title: 'Invalid URL',
      description: translations.theUrlThatYouCopiedIsInvalid
    },
    'ERROR_NETWORK_AUTHENTICATION': {
      title: 'Something went wrong',
      description: translations.somethingWentWrongPleaseTryAgain
    },
    'ERROR_INCORRECT_SCORECARD_CODE': {
      title: 'Incorrect scorecard code',
      description: translations.formatString(translations.thisScorecardCodeIsIncorrect, scorecardCode)
    },
    'LOCKED': {
      title: 'Device is locked',
      description: `Your device is currently locked, please try again at ${unlockAt}`,
    },
    'DEFAULT': {
      title: 'Something went wrong',
      description: `CSC app cannot reach the server at ${backendUrl}. Did you enter the URL correctly? If you keep having this problem, report it to the person who asked you to collect data.`
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