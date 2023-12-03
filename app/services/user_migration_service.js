import AsyncStorage from '@react-native-community/async-storage';
import userService from './user_service';

const userMigrationService  = (() => {
  return {
    migrateUserFromAsyncStorage
  };

  async function migrateUserFromAsyncStorage() {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING'));
    if (!savedSetting || !savedSetting.email)
      return;

    userService.saveSignedInUser(savedSetting.email, savedSetting.password);

    // remove email and password from async storage
    delete savedSetting.email
    delete savedSetting.password
    AsyncStorage.setItem('SETTING', JSON.stringify(savedSetting));
  }
})();

export default userMigrationService;