import realm from '../db/schema';
import { deleteFile } from '../services/local_file_system_service';
import Indicator from './Indicator';

const MODEL = 'LanguageIndicator';

const LanguageIndicator = (() => {
  return {
    getAll,
    create,
    deleteAllByScorecard,
    deleteAll,
    findByIndicatorUuid,
    update,
    destroy,
    findByScorecardAndLanguageCode,
    findByIndicatorAndLanguageCode,
    findByIndicatorUuidAndLanguageCode,
  };

  function getAll() {
    console.log('++ all lang indicator == ', realm.objects(MODEL))
  }

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function deleteAllByScorecard(scorecardUuid) {
    const languageIndicators = realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}'`);
    _deleteLanguageIndicators(languageIndicators);
  }

  function deleteAll() {
    const languageIndicators = realm.objects(MODEL);
    _deleteLanguageIndicators(languageIndicators);
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

  function destroy(indicatorUuid) {
    const languageIndicator = findByIndicatorUuid(indicatorUuid);
    if (!languageIndicator)
      return;

    if (!!languageIndicator.local_audio)
      deleteFile(languageIndicator.local_audio);

    realm.write(() => {
      realm.delete(languageIndicator);
    });
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

  // private method
  function _deleteLanguageIndicators(languageIndicators) {
    if (languageIndicators.length > 0) {
      realm.write(() => {
        realm.delete(languageIndicators);
      });
    }
  }
})();

export default LanguageIndicator;