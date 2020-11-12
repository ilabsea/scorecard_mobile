'use strict';

const ParticipantSchema = {
  name: 'Participant',
  properties: {
    participant: 'int',
    female: 'int',
    disability: 'int',
    minority: 'int',
    poor: 'int',
    youth: 'int',
    uuid: 'string',
  }
}

export default ParticipantSchema;
