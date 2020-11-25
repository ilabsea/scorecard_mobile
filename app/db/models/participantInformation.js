'use strict';

const ParticipantInformationSchema = {
  name: 'ParticipantInformation',
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

export default ParticipantInformationSchema;
