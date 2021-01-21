import RNFS from 'react-native-fs';

const downloadFileFromUrl = async (url, filename, callback) => {
  let background = false;
  let options = {
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

export {downloadFileFromUrl, isFileExist, readAllFiles};