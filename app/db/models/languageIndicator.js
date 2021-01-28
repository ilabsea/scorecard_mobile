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

// filename of local_audio field will have format:
//   'indicator_' + langauge_indicator.id + '_' + language_indicator.language_code + "_" + language_indicator.audio_filename;
//   Ex: indicator_1_km_voice.mp3