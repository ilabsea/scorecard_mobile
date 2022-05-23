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
    username: 'string?',
    password: 'string?',
    shortcut: 'string?',
    shortcut_bg_color: 'string?',
    shortcut_text_color: 'string?',
  },
};

export default EndpointUrlSchema;
