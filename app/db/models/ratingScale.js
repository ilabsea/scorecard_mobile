'use strict';
const RatingScaleSchema = {
  name: 'RatingScale',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    value: 'string',
    program_id: 'int'
  },
};
export default RatingScaleSchema;