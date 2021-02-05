import realm from '../db/schema';

const customIndicatorService = (() => {
  return {
    deleteCustomIndicators,
  }

  function deleteCustomIndicators(scorecardUuid) {
    const customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    realm.write(() => {
      realm.delete(customIndicators);
    });
  }
})();

export default customIndicatorService;