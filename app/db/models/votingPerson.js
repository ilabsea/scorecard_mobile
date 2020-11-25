// has_many ratings

'use strict';

const VotingPersonSchema = {
  name: 'VotingPerson',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    gender: 'string',
    age: 'int',
    disability: 'bool',
  }
}

export default VotingPersonSchema;
