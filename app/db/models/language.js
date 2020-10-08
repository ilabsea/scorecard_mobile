'use strict';

const LanguageSchema = {
  name: 'Language',
  primaryKey: 'code',
  properties: {
    code: 'string',
    name: 'string',
    file: 'string?',
    version: 'string?'
  }
}

export default LanguageSchema;
