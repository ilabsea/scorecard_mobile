import RNFS from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'
import Share from 'react-native-share';

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
  function _downloadAndShareFile(scorecardUuid) {
    const fileName = `${scorecardUuid}.pdf`;

    // To do: replace the static url with download scorecard pdf file endpoint
    downloadFileFromUrl('http://www.africau.edu/images/default/sample.pdf', fileName, async (isSuccess, response, localFilePath) => {
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