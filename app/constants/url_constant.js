import { DEFAULT } from './main_constant';

export const validScorecardUrls = [
  'https://isaf.digital-csc.org/scorecards',
  'http://isaf.digital-csc.org/scorecards',
  'https://isaf-stg.ilabsea.org/scorecards',
  'http://isaf-stg.ilabsea.org/scorecards',
  'https://isaf-stg.digital-csc.org',
  'http://isaf-stg.digital-csc.org',
  'https://isaf.digital-csc.org',
  'http://isaf.digital-csc.org',
];

export const defaultEndpointUrls = [
  { label: 'ISAF Staging Server', value: 'https://isaf-stg.digital-csc.org', type: DEFAULT, shortcut: 'PROD', shortcut_bg_color: '#008000', shortcut_text_color: '#ffffff' },
  { label: 'ISAF Production Server', value: 'https://isaf.digital-csc.org', type: DEFAULT, shortcut: 'TESTING', shortcut_bg_color: '#ffa500', shortcut_text_color: '#ffffff' },
]

export const urlPrefixes = ['https://', 'http://'];