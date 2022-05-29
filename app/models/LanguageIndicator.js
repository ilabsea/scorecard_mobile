import realm from '../db/schema';
import { deleteFile } from '../services/local_file_system_service';
import settingHelper from '../helpers/setting_helper';
import Indicator from '../models/Indicator';

const MODEL = 'LanguageIndicator';

const LanguageIndicator = (() => {
  return {
    getAll,
    create,
    deleteAll,
    findByIndicatorId,
    update,
    destroy,
    findByScorecardAndLanguageCode,
    findByIndicatorAndLanguageCode,
  };

  function getAll() {
    console.log('++ all lang indicator = ', realm.objects(MODEL))
  }

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

  // async function findByIndicatorAndLanguageCode(indicatorId, languageCode) {
  async function findByIndicatorAndLanguageCode(indicatorUuid, languageCode) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    // const indicator = Indicator.

    // return realm.objects(MODEL).filtered(`indicator_id == '${indicatorId}' AND language_code == '${languageCode}'`)[0];
    return realm.objects(MODEL).filtered(`indicator_uuid == '${indicatorUuid}' AND language_code == '${languageCode}'`)[0];
  }
})();

export default LanguageIndicator;