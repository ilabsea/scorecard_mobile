import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'
import Share from 'react-native-share';
import AsyncStorage from '@react-native-community/async-storage';

import { downloadFileFromUrl, isFileExist, deleteFile } from './local_file_system_service';
import { ERROR_SOMETHING_WENT_WRONG } from '../constants/error_constant';

const scorecardSharingService = (() => {
  return {
    shareScorecardPdfFile,
    deleteScorecardPdf,
  }

  async function shareScorecardPdfFile(scorecardUuid, updateLoadingStatus, updateErrorMessageModal) {
    if (await isFileExist(`${scorecardUuid}.pdf`)) {
      const filePath = `${RNFS.DocumentDirectoryPath}/${scorecardUuid}.pdf`;
      _shareFile(filePath, scorecardUuid, updateErrorMessageModal);
    }
    else
      _downloadAndShareFile(scorecardUuid, updateLoadingStatus, updateErrorMessageModal);
  }

  async function deleteScorecardPdf(scorecardUuid) {
    if (await isFileExist(`${scorecardUuid}.pdf`))
      deleteFile(`${scorecardUuid}.pdf`);
  }

  // private method
  async function _downloadAndShareFile(scorecardUuid, updateLoadingStatus, updateErrorMessageModal) {
    const fileName = `${scorecardUuid}.pdf`;
    const domain = await AsyncStorage.getItem('ENDPOINT_URL');
    const endpoint = `${domain}/api/v1/scorecards/${scorecardUuid}.pdf`;
  
    updateLoadingStatus(true);

    downloadFileFromUrl(endpoint, fileName, async (isSuccess, response, localFilePath) => {
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
})();

export default scorecardSharingService;