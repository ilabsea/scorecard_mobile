import { navigationRef } from '../navigators/app_navigator';

const isProposedIndicatorScreen = () => {
  return navigationRef.current?.getCurrentRoute().name === 'RaisingProposed';
}

export { isProposedIndicatorScreen };