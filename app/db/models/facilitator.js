'use strict';

const FacilitatorSchema = {
  name: 'Facilitator',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    id: 'int',              // id of CAF
    name: 'string',
    position: 'string',
    scorecard_uuid: 'string',
  },
};

export default FacilitatorSchema;
