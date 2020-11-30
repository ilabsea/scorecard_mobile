'use strict';

const CustomIndicatorSchema = {
  name: 'CustomIndicator',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    note: 'string?',
    audio: 'string?',
    tag: 'string?',
    scorecard_uuid: 'string',
  },
};

export default CustomIndicatorSchema;