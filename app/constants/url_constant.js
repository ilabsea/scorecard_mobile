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
  'https://scorecard-stg.dojoconnect.co',
  'http://scorecard-stg.dojoconnect.co',
  'https://staging.digitalscorecard.org',
  'http://staging.digitalscorecard.org',
  'https://digitalscorecard.org',
  'http://digitalscorecard.org'
];

export const defaultEndpointUrls = [
  { label: 'ISAF Testing Server', value: 'https://staging.digitalscorecard.org', type: DEFAULT, shortcut: 'TESTING', shortcut_bg_color: '#ffa500', shortcut_text_color: '#ffffff' },
  { label: 'ISAF Production Server', value: 'https://digitalscorecard.org', type: DEFAULT, shortcut: 'ISAF', shortcut_bg_color: '#008000', shortcut_text_color: '#ffffff' },
]

export const urlPrefixes = ['https://', 'http://'];