import realm from '../db/schema';
import ratings from '../db/jsons/ratings';

const ratingService = (() => {
  return {
    create
  }

  function create(data) {
    realm.write(() => {
      realm.create('Rating', data);
    })
  }
})();

export default ratingService;
