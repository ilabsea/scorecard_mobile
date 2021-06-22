import realm from '../db/schema';

const LanguageIndicator = (() => {
  return {
    create,
    deleteAll,
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
})();

export default LanguageIndicator;