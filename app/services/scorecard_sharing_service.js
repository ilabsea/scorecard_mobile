import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'
import Share from 'react-native-share';
import AsyncStorage from '@react-native-community/async-storage';

import { downloadFileFromUrl } from './local_file_system_service';
import { ERROR_SOMETHING_WENT_WRONG } from '../constants/error_constant';
import { getPDFPath } from '../utils/file_util';

const scorecardSharingService = (() => {
  return {
    shareScorecardPdfFile,
    deleteScorecardPdf,
  }

  async function shareScorecardPdfFile(scorecardUuid, updateLoadingStatus, updateErrorMessageModal, appLanguage) {
    const fileName = _getFileName(scorecardUuid, appLanguage);

    if (await _isFileExist(fileName)) {
      _shareFile(getPDFPath(fileName), scorecardUuid, updateErrorMessageModal);
    }
    else
      _downloadAndShareFile(scorecardUuid, updateLoadingStatus, updateErrorMessageModal, appLanguage);
  }

  function deleteScorecardPdf(scorecardUuid) {
    const languages = ['km', 'en'];

    languages.map(async (language) => {
      const fileName = _getFileName(scorecardUuid, language);
      if (await _isFileExist(fileName))
        RNFS.unlink(getPDFPath(fileName));
    });
  }

  // private method
  function _getFileName(scorecardUuid, appLanguage) {
    return `scorecard_${scorecardUuid}_${appLanguage}.pdf`;
  }

  async function _downloadAndShareFile(scorecardUuid, updateLoadingStatus, updateErrorMessageModal, appLanguage) {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    if (granted == PermissionsAndroid.RESULTS.GRANTED) {
      const domain = await AsyncStorage.getItem('ENDPOINT_URL');
      const endpoint = `${domain}/api/v1/scorecards/${scorecardUuid}.pdf?locale=${appLanguage}`;
    
      updateLoadingStatus(true);

      downloadFileFromUrl(endpoint, _getFileName(scorecardUuid, appLanguage), true, async (isSuccess, response, localFilePath) => {
        if (isSuccess) {
          updateLoadingStatus(false);
          _shareFile(localFilePath, scorecardUuid, updateErrorMessageModal);
        }
        else {
          updateLoadingStatus(false);
          updateErrorMessageModal(ERROR_SOMETHING_WENT_WRONG, true);
        }
      });
    }
  }

  function _shareFile(filePath, scorecardUuid, updateErrorMessageModal) {
    RNFetchBlob.fs.readFile(filePath, 'base64')
      .then((base64Data) => {
        const base64FilePath = `data:application/pdf;base64,` + base64Data;
        const fileName = `scorecard_${scorecardUuid}`;

        Share.open({ url: base64FilePath, filename: fileName, failOnCancel: false })
          .catch((error) => {
            updateErrorMessageModal(ERROR_SOMETHING_WENT_WRONG, true);
          })
      })
  }

  async function _isFileExist(fileName) {
    const filePath = getPDFPath(fileName);
    return await RNFS.exists(filePath);
  }
})();

export default scorecardSharingService;