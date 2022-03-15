// belongs_to voting_indicator
// belongs_to voting_person

'use strict';

const RatingSchema = {
  name: 'Rating',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    voting_indicator_uuid: 'string',
    participant_uuid: 'string?',
    score: 'int',
  }
}

export default RatingSchema;
