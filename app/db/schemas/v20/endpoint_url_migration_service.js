import endpointUrlHelper from '../../../helpers/endpoint_url_helper';
import { defaultEndpointUrls } from '../../../constants/url_constant';
import {CUSTOM} from '../../../constants/main_constant';

const endpointUrlMigrationService = (() => {
  return {
    addShortcut
  }

  function addShortcut(oldRealm, newRealm) {
    const oldEndpointUrls = oldRealm.objects('EndpointUrl').sorted('order');
    const newEndpointUrls = newRealm.objects('EndpointUrl').sorted('order');
    const oldCustomEndpointUrls = oldRealm.objects('EndpointUrl').filtered(`type = '${CUSTOM}' SORT(order ASC)`);

    oldEndpointUrls.map((oldEndpointUrl, index) => {
      const shortcutInfo = endpointUrlHelper.generateShortcutInfo(oldCustomEndpointUrls, oldEndpointUrl.value);
      // Update the label of "ISAF Staging Server" to "ISAF Testing Server"
      if (oldEndpointUrl.value == defaultEndpointUrls[0].value)
        newEndpointUrls[index].label = defaultEndpointUrls[0].label;

      newEndpointUrls[index].shortcut = !oldEndpointUrl.shortcut ? shortcutInfo.shortcut : oldEndpointUrl.shortcut;
      newEndpointUrls[index].shortcut_bg_color = !oldEndpointUrl.shortcut_bg_color ? shortcutInfo.shortcut_bg_color : oldEndpointUrl.shortcut_bg_color;
      newEndpointUrls[index].shortcut_text_color = !oldEndpointUrl.shortcut_text_color ? shortcutInfo.shortcut_text_color : oldEndpointUrl.shortcut_text_color;
    });
  }
})();

export default endpointUrlMigrationService;