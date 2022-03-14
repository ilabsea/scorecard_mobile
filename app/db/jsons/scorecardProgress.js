export default [
  {
    value: 1,
    headerTitle: 'setup',
    label: 'setup',
    getSubTitle: 'getScorecardSetupSubTitle',
    routeName: 'ScorecardPreference'
  },
  { value: 2,
    headerTitle: 'proposedIndicator',
    label: 'proposedIndicator',
    getSubTitle: 'getProposedIndicatorSubTitle',
    routeName: 'OfflineRaisingProposed'
  },
  { value: 3,
    headerTitle: 'setIndicatorDevelopment',
    label: 'indicatorDevelopment',
    getSubTitle: 'getIndicatorDevelopmentSubTitle',
    routeName: 'OfflineIndicatorDevelopment'
  },
  { value: 4,
    headerTitle: 'voting',
    label: 'voting',
    getSubTitle: '',
    routeName: 'VotingIndicatorList'
  },
  { value: 5,
    headerTitle: 'scorecardResult',
    label: 'scorecardResult',
    getSubTitle: '',
    routeName: 'OfflineScorecardResult'
  },
]
