import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import { getAudioPath, getPDFPath } from '../utils/file_util';
import authenticationService from './authentication_service';

const downloadFileFromUrl = (url, filename, isPdfFile, callback) => {
  console.log('=== download file ===')
  authenticationService.reNewAuthToken(() => {
    _downloadFile(url, filename, isPdfFile, callback);
  });
}

const isFileExist = async (fileName) => {
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  const isFileExist = await RNFS.exists(filePath);
  return isFileExist;
}

const readAllFiles = (callback) => {
  const path = RNFS.DocumentDirectoryPath;
  RNFS.readDir(path)
    .then((result) => {
      callback(true, result);
    })
    .catch((err) => {
      console.log(err);
    })
}

const deleteFile = (filePath) => {
  RNFS.exists(filePath)
      .then( (result) => {
        console.log("file exists: ", result);

        if (!result) { return; }

        return RNFS.unlink(filePath)
          .then(() => {
            console.log('FILE DELETED');
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
}

const getFileState = async (filePath) => {
  return await RNFS.stat(filePath)
}

// private method
const _downloadFile = async (url, filename, isPdfFile, callback) => {
  let background = false;
  const authToken = await AsyncStorage.getItem('AUTH_TOKEN');

  let destinationPath = isPdfFile ? getPDFPath(filename) : getAudioPath(filename);
  let options = {
    fromUrl: url,
    toFile: destinationPath,
    background,
  };

  if (isPdfFile) {
    options['headers'] = {
      Accept: 'application/json',
      Authorization: `Token ${authToken}`,
    }
  }

  await RNFS.downloadFile(options).promise.then(res => {
    const isSuccess = res.statusCode == 200 ? true : false;
    callback(isSuccess, res, options.toFile);
  }).catch(err => {
    callback(false, err);
  });
}

export {downloadFileFromUrl, isFileExist, readAllFiles, deleteFile, getFileState};