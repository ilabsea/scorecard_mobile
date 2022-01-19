import { environment } from '../config/environment';

export const lockConditions = (type) => {
  const lockConditions = {
    'FAILED_SIGN_IN_ATTEMPT': { max_attempt: environment.maxSignInAttempt }
  }

  lockConditions[type]['reset_count_duration'] = environment.resetCountDuration;
  lockConditions[type]['reset_lock_duration'] = environment.resetLockDuration;

  return lockConditions[type];
}