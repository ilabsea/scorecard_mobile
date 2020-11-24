'use strict';

const ProposedCriteriaSchema = {
  name: 'ProposedCriteria',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    indicatorable_id: 'string?',
    indicatorable_type: 'string?',
    tag: 'string?',
    participant_uuid: 'string?',
  },
};

export default ProposedCriteriaSchema;
