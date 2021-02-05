import realm from '../db/schema';

const facilitatorService = (() => {
  return {
    deleteFacilitators,
  }

  function deleteFacilitators(scorecardUuid) {
    const facilitators = realm.objects('Facilitator').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    realm.write(() => {
      realm.delete(facilitators);
    });
  }
})();

export default facilitatorService;