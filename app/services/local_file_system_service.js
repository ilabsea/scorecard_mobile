import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';

const downloadFileFromUrl = async (url, filename, callback) => {
  let background = false;
  const authToken = await AsyncStorage.getItem('AUTH_TOKEN');

  let options = {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${authToken}`,
    },
    fromUrl: url,
    toFile: `${RNFS.DocumentDirectoryPath}/${filename}`,
    background,
  };

  await RNFS.downloadFile(options).promise.then(res => {
    callback(true, res, options.toFile);
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

const deleteFile = (fileName) => {
  RNFS.unlink(`${RNFS.DocumentDirectoryPath}/${fileName}`);
}

export {downloadFileFromUrl, isFileExist, readAllFiles, deleteFile};