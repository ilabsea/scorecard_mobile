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

// "uuid" will not be used in the future, but it cannot be remove because it is used as primary key
// See reference on the link below on "Primary Keys" section
// https://www.mongodb.com/docs/realm-legacy/docs/javascript/latest/index.html