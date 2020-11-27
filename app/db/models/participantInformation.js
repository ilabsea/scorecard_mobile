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
    scorecard_uuid: 'string',
  }
}

export default ParticipantInformationSchema;
