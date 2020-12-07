'use strict';

const FacilitatorSchema = {
  name: 'Facilitator',
  properties: {
    id: 'int',              // id of CAF
    name: 'string',
    position: 'string',
    scorecard_uuid: 'string',
  },
};

export default FacilitatorSchema;
