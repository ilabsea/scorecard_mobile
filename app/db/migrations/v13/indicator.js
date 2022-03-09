'use strict';

const IndicatorSchema = {
  name: 'Indicator',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    indicator_uuid: 'string?',
    id: 'int?',
    name: 'string',
    facility_id: 'int?',
    tag: 'string?',
    scorecard_uuid: 'string?',
    type: 'string'
  },
};

export default IndicatorSchema;