'use strict';

const EndpointUrlSchema = {
  name: 'EndpointUrl',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    label: 'string',
    value: 'string',
    type: 'string',
    order: 'int',
  },
};

export default EndpointUrlSchema;