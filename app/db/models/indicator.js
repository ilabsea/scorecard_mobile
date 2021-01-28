'use strict';

const IndicatorSchema = {
  name: 'Indicator',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'int',
    name: 'string',
    facility_id: 'int',
    tag: 'string',
    image: 'string?',
    local_image: 'string?',
  },
};

export default IndicatorSchema;
