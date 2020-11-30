const LanguageIndicator = {
  name: 'LanguageIndicator',
  primaryKey: 'id',
  properties: {
    id: 'int',
    content: 'string',
    audio: 'string',
    language_code: 'string',
    scorecard_uuid: 'string',
    indicator_id: 'string',
    local_audio: 'string?',
  },
};

export default LanguageIndicator;