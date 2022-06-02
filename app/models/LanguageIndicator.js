import realm from '../db/schema';
import { deleteFile } from '../services/local_file_system_service';
import Indicator from './Indicator';
import { CUSTOM } from '../constants/indicator_constant';

const MODEL = 'LanguageIndicator';

const LanguageIndicator = (() => {
  return {
    create,
    deleteAllByScorecard,
    deleteAll,
    findByIndicatorUuid,
    update,
    findByScorecardAndLanguageCode,
    findByIndicatorAndLanguageCode,
    findByIndicatorUuidAndLanguageCode,
    findByScorecardAndContent,
  };

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function deleteAllByScorecard(scorecardUuid) {
    const languageIndicators = realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}' AND type = '${CUSTOM}'`);
    _deleteLanguageIndicatorsAndAudios(languageIndicators);
  }

  function deleteAll() {
    const languageIndicators = realm.objects(MODEL);
    _deleteLanguageIndicatorsAndAudios(languageIndicators);
  }

  function findByIndicatorUuid(indicatorUuid) {
    return realm.objects(MODEL).filtered(`indicator_uuid = '${indicatorUuid}'`)[0];
  }

  function update(id, params) {
    if (realm.objects(MODEL).filtered(`id = '${id}'`)) {
      realm.write(() => {
        realm.create(MODEL, Object.assign(params, {id: id}), 'modified');
      })
    }
  }

  function findByScorecardAndLanguageCode(scorecardUuid, languageCode) {
    return realm.objects(MODEL).filtered(`scorecard_uuid == '${scorecardUuid}' AND language_code == '${languageCode}'`)
  }

  function findByIndicatorAndLanguageCode(indicatorId, indicatorType, languageCode) {
    const indicator = Indicator.find(indicatorId, indicatorType);
    return findByIndicatorUuidAndLanguageCode(indicator.indicator_uuid, languageCode);
  }

  function findByIndicatorUuidAndLanguageCode(indicatorUuid, languageCode) {
    return realm.objects(MODEL).filtered(`indicator_uuid == '${indicatorUuid}' AND language_code == '${languageCode}'`)[0];
  }

  function findByScorecardAndContent(scorecardUuid, languageCode, type, content) {
    return realm.objects(MODEL).filtered(`scorecard_uuid == '${scorecardUuid}' AND language_code == '${languageCode}' AND type = '${type}' AND content ==[c] '${content}'`)[0];
  }

  // private method
  function _deleteLanguageIndicatorsAndAudios(languageIndicators) {
    if (languageIndicators.length > 0) {
      languageIndicators.map(languageIndicator => {
        setTimeout(() => {
          if (!!languageIndicator.local_audio)
            deleteFile(languageIndicator.local_audio);

          realm.write(() => {
            realm.delete(languageIndicator);
          });
        }, 20);
      });
    }
  }
})();

export default LanguageIndicator;