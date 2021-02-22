import realm from '../db/schema';

const customIndicatorService = (() => {
  return {
    deleteCustomIndicators,
  }

  function find(uuid) {
    return realm.objects('CustomIndicator').filtered(`uuid='${uuid}'`)[0];
  }

  function deleteCustomIndicators(scorecardUuid) {
    const customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    realm.write(() => {
      realm.delete(customIndicators);
    });
  }
})();

export default customIndicatorService;