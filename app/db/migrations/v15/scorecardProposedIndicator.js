'use strict';

const ScorecardProposedIndicatorSchema = {
  name: 'ScorecardProposedIndicator',
  primaryKey: 'scorecard_uuid',
  properties: {
    scorecard_uuid: 'string',
    order: 'int',
  },
};

export default ScorecardProposedIndicatorSchema;