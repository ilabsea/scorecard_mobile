// belongs_to voting_criteria
// belongs_to voting_person

'use strict';

const RatingSchema = {
  name: 'Rating',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    voting_criteria_uuid: 'string',
    participant_uuid: 'string?',
    score: 'int',
  }
}

export default RatingSchema;
