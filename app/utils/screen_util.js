import { navigationRef } from '../navigators/app_navigator';

const isProposedIndicatorScreen = () => {
  return navigationRef.current?.getCurrentRoute().name === 'ProposedIndicator';
}

const isCreateNewIndicatorScreen = () => {
  return navigationRef.current?.getCurrentRoute().name === 'CreateNewIndicator';
}

export { isProposedIndicatorScreen, isCreateNewIndicatorScreen };