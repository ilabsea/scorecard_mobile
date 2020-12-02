const ScorecardPreference = {
  name: 'ScorecardPreference',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    selected_date: 'date',
    text_language_code: 'string',
    audio_language_code: 'string',
  },
};

export default ScorecardPreference;