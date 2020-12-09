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

const readFile = (fileName, callback) => {
  const path = RNFS.DocumentDirectoryPath;

  RNFS.readDir(path)
    .then((result) => {
      const searchedFile = result.filter(obj => {
        return obj.name == fileName;
      });

      if (searchedFile.length === 0)
        return Promise.all({}, {});

      return Promise.all([RNFS.stat(searchedFile[0].path), searchedFile[0].path]);
    })
    .then((statResult) => {
      if (statResult.length === 0)
        callback(false, 'file not found');
      else if (statResult[0].isFile()) {
        const result = RNFS.readFile(statResult[1], 'base64');
        callback(true, result);
      }
    })
    .catch((err) => {
      console.log(err)
    });
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

export {downloadFileFromUrl, readFile, readAllFiles};