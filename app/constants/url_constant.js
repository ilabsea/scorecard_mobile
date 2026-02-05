import { DEFAULT } from './main_constant';

export const validScorecardUrls = [
  'https://scorecard-stg.dojoconnect.co',
  'http://scorecard-stg.dojoconnect.co',
  'https://staging.digitalscorecard.org',
  'http://staging.digitalscorecard.org',
  'https://digitalscorecard.org',
  'http://digitalscorecard.org'
];

export const defaultEndpointUrls = [
  { label: 'PlasticSmart Testing Server', value: 'https://staging.digitalscorecard.org', type: DEFAULT, shortcut: 'TESTING', shortcut_bg_color: '#ffa500', shortcut_text_color: '#ffffff' },
  { label: 'PlasticSmart Production Server', value: 'https://digitalscorecard.org', type: DEFAULT, shortcut: 'PlasticSmart', shortcut_bg_color: '#008000', shortcut_text_color: '#ffffff' },
]

export const urlPrefixes = ['https://', 'http://'];