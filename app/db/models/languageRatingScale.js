'use strict';
const LanguageRatingScaleSchema = {
  name: 'LanguageRatingScale',
  primaryKey: 'id',
  properties: {
    id: 'int',
    language_code: 'string',
    audio: 'string',
    local_audio: 'string?',
    rating_scale_id: 'int',
    rating_scale_code: 'string',
    program_id: 'int'
  },
};
export default LanguageRatingScaleSchema;