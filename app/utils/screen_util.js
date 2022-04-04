import { navigationRef } from '../navigators/app_navigator';

const isRaisingProposedScreen = () => {
  return navigationRef.current?.getCurrentRoute().name === 'RaisingProposed';
}

const isCreateNewIndicatorScreen = () => {
  return navigationRef.current?.getCurrentRoute().name === 'CreateNewIndicator';
}

export { isRaisingProposedScreen, isCreateNewIndicatorScreen };