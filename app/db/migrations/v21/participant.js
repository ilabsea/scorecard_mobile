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
    voted: { type: 'bool', default: false },
    raised: { type: 'bool', default: false },
    counted: { type: 'bool', default: true }
  },
};

export default ParticipantSchema;
