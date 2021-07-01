'use strict';

const ScorecardImageSchema = {
  name: 'ScorecardImage',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    image_path: 'string',
  }
}

export default ScorecardImageSchema;