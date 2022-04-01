'use strict';

const VotingIndicatorSchema = {
  name: 'VotingIndicator',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    scorecard_uuid: 'string',
    indicatorable_id: 'string?',
    indicatorable_type: 'string?',
    tag: 'string?',
    median: 'int?',
    strength: 'string?',
    weakness: 'string?',
    suggested_action: 'string?',
    very_bad_count: {type: 'int', default: 0},
    bad_count: {type: 'int', default: 0},
    acceptable_count: {type: 'int', default: 0},
    good_count: {type: 'int', default: 0},
    very_good_count: {type: 'int', default: 0},
    suggested_action_status: {type: 'bool[]', optional: true},
    order: 'int'
  }
}

export default VotingIndicatorSchema;