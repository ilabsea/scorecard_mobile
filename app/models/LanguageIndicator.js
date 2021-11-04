import realm from '../db/schema';

const LanguageIndicator = (() => {
  return {
    create,
    deleteAll,
    findByIndicatorId,
    update,
  };

  function create(data) {
    realm.write(() => {
      realm.create('LanguageIndicator', data, 'modified');
    });
  }

  function deleteAll(scorecardUuid) {
    const languageIndicators = realm.objects('LanguageIndicator').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    if (languageIndicators.length > 0) {
      realm.write(() => {
        realm.delete(languageIndicators);
      });
    }
  }

  function findByIndicatorId(indicatorId) {
    return realm.objects('LanguageIndicator').filtered(`indicator_id = '${indicatorId}'`)[0];
  }

  function update(id, params) {
    if (realm.objects('LanguageIndicator').filtered(`id = '${id}'`)) {
      realm.write(() => {
        realm.create('LanguageIndicator', Object.assign(params, {id: id}), 'modified');
      })
    }
  }
})();

export default LanguageIndicator;