import RNFS from 'react-native-fs';
import {getAudioFilename} from './audio_service';

const downloadFileFromUrl = (url, languageIndicator, callback) => {
  const fileUrl = url.split("/");
  let progress = data => {};
  let begin = res => {};
  let progressDivider = 1;
  let background = false;
  const fileName = getAudioFilename(languageIndicator.id, languageIndicator.language_code, fileUrl[fileUrl.length - 1]);       //Ex: 1_km_voice.mp3 or 2_en_voice.mp3
  let options = {
    fromUrl: url,
    toFile: `${RNFS.DocumentDirectoryPath}/${fileName}`,
    begin,
    progress,
    background,
    progressDivider
  };
  RNFS.downloadFile(options).promise.then(res => {
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