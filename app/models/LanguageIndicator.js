import realm from '../db/schema';
import { deleteFile } from '../services/local_file_system_service';
import Indicator from './Indicator';

const MODEL = 'LanguageIndicator';

const LanguageIndicator = (() => {
  return {
    create,
    deleteAll,
    findByIndicatorId,
    update,
    destroy,
    findByScorecardAndLanguageCode,
    findByIndicatorAndLanguageCode,
    findByIndicatorUuidAndLanguageCode,
  };

  function create(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function deleteAll(scorecardUuid) {
    const languageIndicators = realm.objects(MODEL).filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (languageIndicators.length > 0) {
      realm.write(() => {
        realm.delete(languageIndicators);
      });
    }
  }

  function findByIndicatorId(indicatorId) {
    // return realm.objects(MODEL).filtered(`indicator_id = '${indicatorId}'`)[0];
    return realm.objects(MODEL).filtered(`indicator_uuid = '${indicatorId}'`)[0];
  }

  function update(id, params) {
    if (realm.objects(MODEL).filtered(`id = '${id}'`)) {
      realm.write(() => {
        realm.create(MODEL, Object.assign(params, {id: id}), 'modified');
      })
    }
  }

  function destroy(indicatorId) {
    const languageIndicator = findByIndicatorId(indicatorId);
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
})();

export default LanguageIndicator;