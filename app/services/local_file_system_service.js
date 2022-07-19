import RNFS from 'react-native-fs';
import { getAudioPath, getPDFPath } from '../utils/file_util';
import BaseApi from '../api/BaseApi';

const downloadFileFromUrl = async (url, filename, isPdfFile, callback) => {
  let background = false;
  const token = await BaseApi.authenticate();
  let destinationPath = isPdfFile ? getPDFPath(filename) : getAudioPath(filename);
  let options = {
    fromUrl: url,
    toFile: destinationPath,
    background,
  };

  if (isPdfFile) {
    options['headers'] = {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    }
  }

  await RNFS.downloadFile(options).promise.then(res => {
    const isSuccess = res.statusCode == 200 ? true : false;
    callback(isSuccess, res, options.toFile);
  }).catch(err => {
    callback(false, err);
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

export {downloadFileFromUrl, isFileExist, readAllFiles, deleteFile, getFileState};