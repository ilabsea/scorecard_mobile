'use strict';

const ScorecardDownloadSchema = {
  name: 'ScorecardDownload',
  primaryKey: 'scorecard_uuid',
  properties: {
    scorecard_uuid: 'string',
    info_step: 'string',
    audio_step: 'string',
    info_download_percentage: { type: 'float', default: 0 },
    audio_download_percentage: { type: 'float', default: 0 },
  },
}

export default ScorecardDownloadSchema;