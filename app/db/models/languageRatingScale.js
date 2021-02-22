'use strict';
const LanguageRatingScaleSchema = {
  name: 'LanguageRatingScale',
  primaryKey: 'id',
  properties: {
    id: 'int',
    language_code: 'string',
    audio: 'string',
    content: 'string',
    local_audio: 'string?',
    rating_scale_id: 'int',
    rating_scale_code: 'string',
    program_id: 'int'
  },
};
export default LanguageRatingScaleSchema;

// filename of local_audio field will have format:
//   'rating_' + langauge_indicator.id + '_' + language_indicator.language_code + ".mp3";
//   Ex: rating_1_km.mp3