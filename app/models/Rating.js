import realm from '../db/schema';

const Rating = (() => {
  return {
    create,
    deleteAll,
  }

  function create(data) {
    realm.write(() => {
      realm.create('Rating', data);
    })
  }

  function deleteAll(scorecardUuid) {
    const ratings = realm.objects('Rating').filtered(`scorecard_uuid = '${scorecardUuid}'`);

    realm.write(() => {
      realm.delete(ratings);
    });
  }
})();

export default Rating;
