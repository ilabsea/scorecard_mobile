'use strict';

const ScorecardDownloadSchema = {
  name: 'ScorecardDownload',
  primaryKey: 'scorecard_uuid',
  properties: {
    scorecard_uuid: 'string',
    step: 'string',
    finished: { type: 'bool', default: false },
    download_percentage: { type: 'float', default: 0 },
  },
}

export default ScorecardDownloadSchema;