import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import { environment } from '../config/environment';
import { downloadFileFromUrl, isFileExist } from './local_file_system_service';

import IndicatorApi from '../api/IndicatorApi';
import { handleApiResponse } from './api_service';
import { saveLanguageIndicator } from './language_indicator_service';

import { indicatorPhase, indicatorImagePhase } from '../constants/scorecard_constant';

const saveIndicatorSection = async (scorecardUuid, facilityId, successCallback, errorCallback) => {
  const indicatorApi = new IndicatorApi();
  const response = await indicatorApi.load(facilityId);

  handleApiResponse(response, (indicators) => {
    _saveIndicator(indicators, scorecardUuid, successCallback);
    saveLanguageIndicator(scorecardUuid, indicators, successCallback)
  }, (error) => {
    console.log('error download caf = ', error);
    errorCallback();
  });
}

function _saveIndicator(indicators, scorecardUuid, successCallback) {
  let savedCount = 0;
  indicators.map((indicator) => {
    if (!isExist(indicator.id)) {
      const indicatorSet = {
        uuid: uuidv4(),
        id: indicator.id,
        name: indicator.name,
        facility_id: indicator.categorizable.id,
        scorecard_uuid: scorecardUuid,
        tag: indicator.tag_name,
        image: indicator.image != null ? indicator.image : undefined,
      };
      realm.write(() => {
        realm.create('Indicator', indicatorSet, 'modified');
      });
    }
    savedCount += 1;
  });
  successCallback(savedCount === indicators.length, indicatorPhase);
}

const isExist = (indicatorId) => {
  const indicator = realm.objects('Indicator').filtered(`id == ${indicatorId}`)[0];
  return indicator === undefined ? false : true;
}

const getAll = (scorecardUuid) => {
  let predefinedIndicators = getIndicator(scorecardUuid);
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

const find = (indicatorId) => {
  return realm.objects('Indicator').filtered(`id = ${indicatorId}`)[0];
}

function getPredefinedIndicator(indicatorable, scorecard) {
  let predefined = realm.objects('Indicator').filtered(`id='${indicatorable.indicatorable_id}'`)[0];
  let indi = realm.objects('LanguageIndicator').filtered(`indicator_id='${indicatorable.indicatorable_id}' AND language_code='${scorecard.audio_language_code}'`)[0];
  indi = indi || predefined;
  indi = JSON.parse(JSON.stringify(indi));
  indi.content = indi.content || indi.name;
  indi.local_image = predefined.local_image;

  if (!scorecard.isSameLanguageCode) {
    let textIndi = realm.objects('LanguageIndicator').filtered(`indicator_id='${indicatorable.indicatorable_id}' AND language_code='${scorecard.text_language_code}'`)[0];
    indi.content = !!textIndi && textIndi.content;
  }

  return indi;
}

function getIndicator(scorecardUuid) {
  const facilityId = realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0].facility_id;
  return JSON.parse(JSON.stringify(realm.objects('Indicator').filtered(`facility_id = '${facilityId}'`)));
}

class IndicatorService {
  constructor() {
    this.isStopDownload = false;
  }

  saveImage = (scorecardUuid, successCallback, errorCallback) => {
    let indicators = getIndicator(scorecardUuid);
    this.downloadImage(0, indicators, successCallback, errorCallback);
  }

  downloadImage = async (index, indicators, successCallback, errorCallback) => {
    if (index === indicators.length) {
      successCallback(true, indicatorImagePhase);
      return;
    }

    const indicator = indicators[index];
    if (!indicator.image) {
      this.downloadImage(index + 1, indicators, successCallback, errorCallback);
      return;
    }

    const fileUrl = indicator.image.split('/');
    const filename = `${indicator.id}_${fileUrl[fileUrl.length - 1]}`;
    const isImageExist = await isFileExist(filename);

    if (!isImageExist) {
      const url = `${environment.domain}${indicator.image}`;

      downloadFileFromUrl(url, filename,
        (isSuccess, response, localAudioFilePath) => {
          if (isSuccess) {
            const attrs = {
              uuid: indicator.uuid,
              local_image: localAudioFilePath,
            };

            realm.write(() => {
              realm.create('Indicator', attrs, 'modified');
            });

            if (this.isStopDownload)
              return;

            this.downloadImage(index + 1, indicators, successCallback, errorCallback);
          }
          else {
            console.log('error download indicator image = ', response);
            errorCallback();
          }
        }
      );
    }
    else
      this.downloadImage(index + 1, indicators, successCallback, errorCallback);
  }

  stopDownload = () => {
    this.isStopDownload = true;
  }
}

const getTags = (scorecardUuid) => {
  let indicators = getAll(scorecardUuid);

  return indicators.map(indi => indi.tag)
          .filter(tag => !!tag)
          .filter((tag, index, self) => self.indexOf(tag) == index);
}

export {
  saveIndicatorSection,
  getDisplayIndicator,
  getAll,
  find,
  getTags,
  IndicatorService,
};
