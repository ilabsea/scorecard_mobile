'use strict';

const ScorecardReferenceSchema = {
  name: 'ScorecardReference',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    image_path: 'string',
    order: 'int'
  }
}

export default ScorecardReferenceSchema;