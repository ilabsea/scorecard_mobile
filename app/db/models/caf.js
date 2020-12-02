'use strict';

const CafSchema = {
  name: 'Caf',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    local_ngo_id: 'int',
    scorecard_uuid: 'string',
  },
};

export default CafSchema;
