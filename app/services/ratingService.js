import realm from '../db/schema';

const ratingService = (() => {
  return {
    create,
    deleteRatings,
  }

  function create(data) {
    realm.write(() => {
      realm.create('Rating', data);
    })
  }

  function deleteRatings(scorecardUuid) {
    const ratings = realm.objects('Rating').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    realm.write(() => {
      realm.delete(ratings);
    });
  }
})();

export default ratingService;