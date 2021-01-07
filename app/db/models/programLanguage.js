'use strict';

const ProgramLanguageSchema = {
  name: 'ProgramLanguage',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'int',
    name: 'string',
    code: 'string',
    program_id: 'int',
  },
};

export default ProgramLanguageSchema;