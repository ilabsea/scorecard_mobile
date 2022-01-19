import { environment } from '../config/environment';

export const lockConditions = (type) => {
  const lockConditions = {
    'FAILED_SIGN_IN_ATTEMPT': { max_attempt: environment.maxSignInAttempt },
    'INVALID_SCORECARD_ATTEMPT': { max_attempt: environment.maxJoinScorecardAttempt }
  }

  lockConditions[type]['reset_count_duration'] = environment.resetCountDuration;
  lockConditions[type]['reset_lock_duration'] = environment.resetLockDuration;

  return lockConditions[type];
}