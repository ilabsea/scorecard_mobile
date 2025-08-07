import AsyncStorage from '@react-native-async-storage/async-storage';
import lockDeviceService from './lock_device_service';
import { lockConditions } from '../utils/lock_device_util';

const resetLockService = (() => {
  return {
    watchLockStatus,
    resetLockData,
  }

  function watchLockStatus(lockType, callback) {
    _checkResetLockAndCount(lockType, callback);  // call this in order to clear the data right after the watchLockStatus called

    return setInterval(() => {
      _checkResetLockAndCount(lockType, callback);
    }, 1000);
  }

  // private methods
  async function _checkResetLockAndCount(lockType, callback) {
    let lockData = await AsyncStorage.getItem(lockType);
    if (!lockData)
      return;

    lockData = JSON.parse(lockData);
    _checkAndResetLock(lockType, lockData, callback);
    _checkAndResetCount(lockType, lockData, callback);
  }

  // Reset lock when locked at > current date time
  function _checkAndResetLock(lockType, lockData, callback) {
    const lockedAt = lockData['locked_at'];
    if (!lockedAt)
      return

    const isWithinLockedInterval = lockDeviceService.isWithinInterval(lockedAt, lockConditions(lockType).reset_lock_duration);

    if (!isWithinLockedInterval) {
      resetLockData(lockType);
      callback();
    }
  }

  // Reset count when failed at > current date time and attempt count < max attempt
  function _checkAndResetCount(lockType, lockData, callback) {
    if (!!lockData['locked_at'])
      return;

    const failedAt = lockData['failed_at'];
    const { reset_count_duration, max_attempt } = lockConditions(lockType);
    const isWithinWatchInterval = lockDeviceService.isWithinInterval(failedAt, reset_count_duration);

    if (!isWithinWatchInterval && lockData.count < max_attempt) {
      resetLockData(lockType);
      callback();
    }
  }

  function resetLockData(lockType) {
    AsyncStorage.removeItem(lockType);
  }
})();

export default resetLockService;