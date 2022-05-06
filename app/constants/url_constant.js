import { DEFAULT } from './main_constant';

export const validScorecardUrls = [
  'https://isaf.digital-csc.org/scorecards',
  'http://isaf.digital-csc.org/scorecards',
  'https://isaf-stg.ilabsea.org/scorecards',
  'http://isaf-stg.ilabsea.org/scorecards',
  'https://isaf-stg.digital-csc.org',
  'http://isaf-stg.digital-csc.org',
];

export const defaultEndpointUrls = [
  { label: 'ISAF Staging Server', value: 'https://isaf-stg.digital-csc.org', type: DEFAULT },
  { label: 'ISAF Production Server', value: 'https://isaf.digital-csc.org', type: DEFAULT },
]

export const urlPrefixes = ['https://', 'http://'];