import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'
import Share from 'react-native-share';
import AsyncStorage from '@react-native-community/async-storage';

import { downloadFileFromUrl, isFileExist, deleteFile } from './local_file_system_service';

const scorecardSharingService = (() => {
  return {
    shareScorecardPdfFile,
    deleteScorecardPdf,
  }

  async function shareScorecardPdfFile(scorecardUuid) {
    if (await isFileExist(`${scorecardUuid}.pdf`)) {
      const filePath = `${RNFS.DocumentDirectoryPath}/${scorecardUuid}.pdf`;
      _shareFile(filePath);
    }
    else
      _downloadAndShareFile(scorecardUuid);
  }

  async function deleteScorecardPdf(scorecardUuid) {
    if (await isFileExist(`${scorecardUuid}.pdf`))
      deleteFile(`${scorecardUuid}.pdf`);
  }

  // private method
  async function _downloadAndShareFile(scorecardUuid) {
    const fileName = `${scorecardUuid}.pdf`;
    const domain = await AsyncStorage.getItem('ENDPOINT_URL');
    const endpoint = `${domain}/api/v1/scorecards/${scorecardUuid}.pdf`;

    downloadFileFromUrl(endpoint, fileName, async (isSuccess, response, localFilePath) => {
      if (isSuccess)
        _shareFile(localFilePath);
      else
        console.log('download failed = ', response);
    });
  }

  function _shareFile(filePath) {
    RNFetchBlob.fs.readFile(filePath, 'base64')
      .then((base64Data) => {
        const base64FilePath = `data:application/pdf;base64,` + base64Data;

        Share.open({ url: base64FilePath, failOnCancel: false })
          .then((res) => {
            console.log('Finish sharing == ', res);
          })
          .catch((error) => {
            console.log('Sharing error = ', error);
          })
      })
  }
})();

export default scorecardSharingService;