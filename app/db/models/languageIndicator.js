const LanguageIndicator = {
  name: 'LanguageIndicator',
  primaryKey: 'id',
  properties: {
    id: 'string',               // store language indicator id for predefined language indicator and uuid for custom language indicator
    content: 'string?',
    audio: 'string?',
    language_code: 'string',
    scorecard_uuid: 'string',
    indicator_id: 'string',
    local_audio: 'string?',
    type: 'string',
  },
};

export default LanguageIndicator;