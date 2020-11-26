'use strict';

const ParticipantSchema = {
  name: 'Participant',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    age: 'int',
    gender: 'string',
    disability: 'bool',
    minority: 'bool',
    poor: 'bool',
    youth: 'bool',
    scorecard_uuid: 'string',
    order: 'int',
    note: 'string?',
  },
};

export default ParticipantSchema;
