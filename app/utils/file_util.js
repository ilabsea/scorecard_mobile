import RNFS from 'react-native-fs';

const getAudioPath = (filename) => {
  return `${RNFS.DocumentDirectoryPath}/${filename}`;
}

const getPDFPath = (filename) => {
  return `${RNFS.DownloadDirectoryPath}/${filename}`;
}

export {
  getAudioPath,
  getPDFPath
}