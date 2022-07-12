import React from 'react';
import BoldLabel from '../components/Share/BoldLabel';

import Scorecard from '../models/Scorecard';
import settingHelper from '../helpers/setting_helper';
import { getReadableAppLanguage } from './translation_util';
import scorecardProgress from '../db/jsons/scorecardProgress';

const getAlertMessageObject = async (errorType, scorecardUuid, unlockAt = null, localization) => {
  const settingData = await settingHelper.getSettingData();
  const backendUrl = settingData.backendUrl || '';
  const scorecardCode = <BoldLabel label={scorecardUuid || ''} />
  const endpoint = <BoldLabel label={backendUrl} color="blue" />
  const { translations, app_language } = localization

  const scorecard = Scorecard.find(scorecardUuid);
  const step = !!scorecard ? scorecardProgress[scorecard.status - 1] : '';
  const scorecardStep = !!scorecard ? <BoldLabel label={`"${translations[step.label]}"`} /> : '';

  const errors = {
    'ERROR_SUBMIT_SCORECARD': {
      title: translations.unableToSubmitTheScorecard,
      description: translations.formatString(translations.cannotSubmitScorecardErrorMsg, endpoint, scorecardCode)
    },
    'ERROR_SCORECARD_NOT_EXIST': {
      title: translations.theScorecardIsNotExist,
      description: translations.formatString(translations.thisScorecardIsNotExist, scorecardCode)
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
      description: translations.formatString(translations.thePdfFileOfThisLanguageIsNotAvailableToDownload, <BoldLabel label={`"${getReadableAppLanguage(app_language)}" `}/>)
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
    'ERROR_AUTHENTICATION': {
      title: translations.yourSessionHasExpired,
      description: translations.pleaseLoginAgain
    },
    'MISMATCHED_ENDPOINT': {
      title: translations.theServerUrlHasBeenChanged,
      description: translations.formatString(translations.theServerUrlHasBeenChangedDescription, scorecardCode)
    },
    'SCORECARD_SUBMITTED': {
      title: translations.scorecardIsSubmitted,
      description: translations.formatString(translations.thisScorecardIsAlreadySubmitted, scorecardCode)
    },
    'SCORECARD_IN_PROGRESS': {
      title: translations.scorecardIsInStep,
      description: translations.formatString(translations.thisScorecardIsInStep, scorecardCode, scorecardStep),
    },
    'ERROR_DEVICE_LOCKED': {
      title: translations.yourDeviceIsLocked,
      description: translations.formatString(translations.yourDeviceIsCurrentlyLocked, <BoldLabel label={unlockAt} />),
    },
    'RE_LOGIN_REQUIRED': {
      title: translations.reLoginRequired,
      description: translations.reLoginDescription,
    },
    'ERROR_SHARE_PDF_MISMATCH_ENDPOINT': {
      title: translations.theServerUrlHasChanged,
      description: translations.sharePDFMismatchEndpointMessage
    },
    'DEFAULT': {
      title: translations.somethingWentWrong,
      description: translations.formatString(translations.somethingWentWrongMessage, endpoint)
    }
  };

  if (!!unlockAt)
    return errors.ERROR_DEVICE_LOCKED;

  if (!errorType)
    return errors.DEFAULT;

  return errors[errorType.toString()] || errors.DEFAULT;
}

export { getAlertMessageObject };

// Notice:
// - ERROR_ENDPOINT is using the default error message
// - ERROR_NETWORK_AUTHENTICATION and ERROR_SOMETHING_WENT_WRONG is using the something went wrong error message