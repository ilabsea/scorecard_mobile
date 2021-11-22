import { navigationRef } from '../navigators/app_navigator';

const navigateBack = () => {
  if (navigationRef.current?.canGoBack())
    navigationRef.current?.goBack();
  else
    navigationRef.current?.reset({ index: 0, routes: [{ name: 'Home' }] });
}

export { navigateBack };