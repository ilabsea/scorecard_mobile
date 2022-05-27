const LanguageIndicator = {
  name: 'LanguageIndicator',
  primaryKey: 'id',
  properties: {
    id: 'string',               // store language indicator id for predefined language indicator and uuid for custom language indicator
    content: 'string?',
    audio: 'string?',
    language_code: 'string',
    scorecard_uuid: 'string',
    indicator_uuid: 'string',
    local_audio: 'string?',
    type: 'string',
  },
};

export default LanguageIndicator;

// filename of local_audio field will have format:
//   'indicator_' + langauge_indicator.id + '_' + language_indicator.language_code + ".mp3";
//   Ex: indicator_1_km.mp3