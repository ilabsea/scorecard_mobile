import Rating from '../models/Rating';
import { getAttributesByColumns } from '../helpers/scorecard_attributes_helper';

const ratingAttributesHelper = (() => {
  return {
    parse
  };

  function parse(scorecard) {
    let ratings = JSON.parse(JSON.stringify(Rating.getAll(scorecard.uuid)));
    let columns = ['uuid', 'scorecard_uuid', 'participant_uuid', 'score', 'voting_indicator_uuid'];

    let data = ratings.map(rating => {
      let attr = getAttributesByColumns(rating, columns);
      return attr;
    });

    return { 'ratings_attributes': data };
  }
})();

export default ratingAttributesHelper;