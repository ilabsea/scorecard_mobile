import { navigationRef } from '../navigators/app_navigator';

const navigateBack = () => {
  if (navigationRef.current?.canGoBack())
    navigationRef.current?.goBack();
  else
    navigateHome();
}

const navigateHome = () => {
  navigationRef.current?.reset({ index: 0, routes: [{ name: 'Home' }] });
}

export { navigateBack, navigateHome };