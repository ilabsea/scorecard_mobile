'use strict';

const CustomIndicatorSchema = {
  name: 'CustomIndicator',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    content: 'string?',
    local_audio: 'string?',              // store file path in local storage
    tag: 'string?',
    scorecard_uuid: 'string',
    id_from_server: 'int?',
  },
};

export default CustomIndicatorSchema;
