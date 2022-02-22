'use strict';

const ProposedIndicatorSchema = {
  name: 'ProposedIndicator',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    indicatorable_id: 'string?',
    indicatorable_type: 'string?',
    indicatorable_name: 'string?',
    tag: 'string?',
    participant_uuid: 'string?',
    order: 'int?',
  },
};

export default ProposedIndicatorSchema;