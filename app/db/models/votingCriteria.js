// has_many ratings

'use strict';

const VotingCriteriaSchema = {
  name: 'VotingCriteria',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    indicatorable_id: 'string?',
    indicatorable_type: 'string?',
    median: 'string?',
    strength: 'string?',
    weakness: 'string?',
    desired_change: 'string?',
    suggested_action: 'string?'
  }
}

export default VotingCriteriaSchema;
