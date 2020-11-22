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
    indicator_id: 'int?',
    indicator_shortcut_name: 'string?',
    scorecard_uuid: 'string',
    order: 'int',
    note: 'string?',
  },
};

export default ParticipantSchema;
