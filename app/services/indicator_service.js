import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import { environment } from '../config/environment';
import { downloadFileFromUrl, isFileExist } from './local_file_system_service';

import IndicatorApi from '../api/IndicatorApi';
import { handleApiResponse } from './api_service';
import { saveLanguageIndicator } from './language_indicator_service';

import { indicatorPhase, indicatorImagePhase } from '../constants/scorecard_constant';
import  { getIndicatorShortcutName } from '../utils/indicator_util';
import { CUSTOM, PREDEFINED } from '../utils/variable';
import { ERROR_DOWNLOAD_SCORECARD } from '../constants/error_constant';

import indicatorHelper from '../helpers/indicator_helper';
import Indicator from '../models/Indicator';

class IndicatorService {
  constructor() {
    this.isStopDownload = false;
  }

  saveImage = (scorecardUuid, successCallback, errorCallback) => {
    let indicators = this._getPredefinedIndicator(scorecardUuid);
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
      const url = environment.type == 'development' ? `${environment.domain}${indicator.image}` : indicator.image;

      downloadFileFromUrl(url, filename, false,
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

  getAll = (scorecardUuid) => {
    let predefinedIndicators = this._getPredefinedIndicator(scorecardUuid);
    const customIndicators = JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`scorecard_uuid = '${scorecardUuid}'`)));
    predefinedIndicators = predefinedIndicators.concat(customIndicators);

    return predefinedIndicators.sort((a, b) => a.name > b.name);
  }

  saveIndicatorSection = async (scorecardUuid, facilityId, successCallback, errorCallback) => {
    const indicatorApi = new IndicatorApi();
    const response = await indicatorApi.load(facilityId);

    handleApiResponse(response, (indicators) => {
      if (!!indicators) {
        this._saveIndicator(indicators, scorecardUuid, successCallback);
        saveLanguageIndicator(scorecardUuid, indicators, successCallback)
      }
      else
        errorCallback(ERROR_DOWNLOAD_SCORECARD);  // error status 0 means no response (the response returns as null)
    }, (error) => {
      console.log('error download caf = ', error);
      errorCallback(error);
    });
  }

  _saveIndicator(indicators, scorecardUuid, successCallback) {
    let savedCount = 0;
    indicators.map((indicator) => {
      if (!indicatorHelper.isExist(indicator.id)) {
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

  getIndicatorList = (scorecardUuid, searchText, addNewLabel, selectedIndicators) => {
    let savedIndicators = [];
    let hasAddNewIndicator = true;

    if (searchText != '') {
      savedIndicators = Indicator.filter(scorecardUuid, searchText);
      hasAddNewIndicator = false;
    }
    else
      savedIndicators = this.getAll(scorecardUuid);

    return this._getIndicatorAttrs(savedIndicators, selectedIndicators, addNewLabel, hasAddNewIndicator);
  }

  find = (indicatorId) => {
    return realm.objects('Indicator').filtered(`id = ${indicatorId}`)[0];
  }

  // private

  _getPredefinedIndicator(scorecardUuid) {
    const facilityId = realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0].facility_id;
    return JSON.parse(JSON.stringify(realm.objects('Indicator').filtered(`facility_id = '${facilityId}'`)));
  }

  _getIndicatorAttrs = (savedIndicators, proposedCriterias, addNewLabel, hasAddNewItem) => {
    let indicators = [];
    let selectedIndicators = [];

    savedIndicators.map((indicator) => {
      let attrs = {
        uuid: indicator.id || indicator.uuid,
        indicatorable_id: indicator.id != undefined ? indicator.id.toString() : indicator.uuid,
        name: indicator.name,
        shortcut: getIndicatorShortcutName(indicator.name),
        isSelected: false,
        tag: indicator.tag,
        type: !!indicator.id ? PREDEFINED : CUSTOM,
        local_image: indicator.local_image,
      };
      if (proposedCriterias != undefined) {
        for (let i=0; i<proposedCriterias.length; i++) {
          const indicatorId = indicator.id != undefined ? indicator.id.toString() : indicator.uuid;
          if (proposedCriterias[i].indicatorable_id === indicatorId) {
            attrs.isSelected = true;
            selectedIndicators.push(attrs);
            break;
          }
        }
      }
      indicators.push(attrs);
    });

    if (hasAddNewItem)
      indicators.push({name: addNewLabel, uuid: '', shortcut: 'add', isSelected: false, type: 'custom'});

    return {indicators, selectedIndicators};
  }
}

export default IndicatorService;
