import React from 'react';
import {
  ERROR_AUTHENTICATION,
  ERROR_ENDPOINT,
  ERROR_NOT_FOUND,
  ERROR_UNAUTHORIZED,
  ERROR_UNPROCESSABLE,
} from '../constants/error_constant';
import ErrorRequestToServerContent  from '../components/ErrorMessageModal/ErrorRequestToServerContent';
import ErrorAuthenticationContent from '../components/ErrorMessageModal/ErrorAuthenticationContent';
import ErrorMessageMain from '../components/ErrorMessageModal/ErrorMessageMain';

const getErrorMessageContent = (params, onDismiss) => {
  const { error_type, is_new_scorecard, is_submit, scorecard_uuid, backend_url } = params;

  if (error_type === ERROR_AUTHENTICATION)
    return <ErrorAuthenticationContent backendUrl={backend_url} onDismiss={onDismiss} />
  else if (error_type === ERROR_ENDPOINT ||
    (error_type == ERROR_NOT_FOUND && !is_new_scorecard) ||
    error_type === ERROR_UNAUTHORIZED || error_type === ERROR_UNPROCESSABLE) {
    return <ErrorRequestToServerContent
              backendUrl={backend_url}
              onDismiss={onDismiss}
              isSubmit={is_submit}
              errorType={error_type}
              scorecardUuid={scorecard_uuid}
            />;
  }

  return <ErrorMessageMain
            onDismiss={onDismiss}
            scorecardUuid={scorecard_uuid}
            errorType={error_type}
          />
}

export { getErrorMessageContent };