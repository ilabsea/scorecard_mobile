import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import RNFS from 'react-native-fs';
import { environment } from '../config/environment';
import {isFileExist} from '../services/local_file_system_service';

const saveIndicator =  (index, scorecardUUID, indicators, callback) => {
  if (index === indicators.length) {
    callback(true);
    return;
  }

  const indicator = indicators[index];
  if (!isExist(indicator.id)) {
    const indicatorSet = {
      uuid: uuidv4(),
      id: indicator.id,
      name: indicator.name,
      facility_id: indicator.categorizable.id,
      scorecard_uuid: scorecardUUID,
      tag: indicator.tag_name,
    };

    realm.write(() => {
      realm.create('Indicator', indicatorSet, 'modified');
    });

    if (indicator.image)
      downloadImage(indicatorSet.uuid, indicator.id, indicator.image, () => {
        saveIndicator(index + 1, scorecardUUID, indicators, callback);
      });
    else
      saveIndicator(index + 1, scorecardUUID, indicators, callback);
  }
};

const isExist = (indicatorId) => {
  const indicator = realm.objects('Indicator').filtered(`id == ${indicatorId}`)[0];
  return indicator === undefined ? false : true;
}

const getAll = (scorecardUuid) => {
  const facilityId = realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0].facility_id;
  let predefinedIndicators = JSON.parse(JSON.stringify(realm.objects('Indicator').filtered(`facility_id = '${facilityId}'`)));
  const customIndicators = JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`scorecard_uuid = '${scorecardUuid}'`)));
  return predefinedIndicators.concat(customIndicators);
}

const getDisplayIndicator = (indicatorable, scorecardObj) => {
  const scorecard = scorecardObj || realm.objects('Scorecard').filtered(`uuid='${indicatorable.scorecard_uuid}'`)[0];

  if ( indicatorable.indicatorable_type == 'predefined' ) {
    return getPredefinedIndicator(indicatorable, scorecard);
  }

  let indi = JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`uuid='${indicatorable.indicatorable_id}'`)[0]));
  indi.content = indi.content || indi.name;

  return indi;
}

function getPredefinedIndicator(indicatorable, scorecard) {
  let indi = realm.objects('LanguageIndicator').filtered(`indicator_id='${indicatorable.indicatorable_id}' AND language_code='${scorecard.audio_language_code}'`)[0];
  indi = indi || realm.objects('Indicator').filtered(`id='${indicatorable.indicatorable_id}'`)[0];
  indi = JSON.parse(JSON.stringify(indi));
  indi.content = indi.content || indi.name;

  if (!scorecard.isSameLanguageCode) {
    let textIndi = realm.objects('LanguageIndicator').filtered(`indicator_id='${indicatorable.indicatorable_id}' AND language_code='${scorecard.text_language_code}'`)[0];
    indi.content = !!textIndi && textIndi.content;
  }

  return indi;
}

async function downloadImage(indicatorUuid, indicatorId, url, saveCallback) {
  const fileUrl = url.split("/");
  const filename = `${indicatorId}_${fileUrl[fileUrl.length - 1]}`;
  const isImageExist = await isFileExist(filename);

  if (!isImageExist) {
    let options = {
      fromUrl: `${environment.domain}${url}`,
      toFile: `${RNFS.DocumentDirectoryPath}/${filename}`,
      background: false,
    };
    RNFS.downloadFile(options).promise.then(res => {
      const attrs = {
        uuid: indicatorUuid,
        local_image: options.toFile,
      };

      realm.write(() => {
        realm.create('Indicator', attrs, 'modified');
      });
      saveCallback();
    }).catch(err => {
      console.log('error download indicator image = ', err);
      saveCallback();
    });
  }
}

export {
  saveIndicator,
  getDisplayIndicator,
  getAll,
};
