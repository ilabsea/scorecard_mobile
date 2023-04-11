import { navigationRef } from '../navigators/app_navigator';

const isProposedIndicatorScreen = () => {
  return navigationRef.current?.getCurrentRoute().name === 'ProposedIndicator';
}

const isCreateNewIndicatorScreen = () => {
  // return navigationRef.current?.getCurrentRoute().name === 'CreateNewIndicator';
  return navigationRef.current?.getCurrentRoute().name === 'ProposeNewIndicator';
}

const isVotingScreen = () => {
  const currentRoute = navigationRef.current?.getCurrentRoute();
  return currentRoute.name == 'VotingIndicatorList' || currentRoute.name == 'VotingIndicatorForm'
}

export { isProposedIndicatorScreen, isCreateNewIndicatorScreen, isVotingScreen };