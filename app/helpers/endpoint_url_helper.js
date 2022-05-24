import EndpointUrl from '../models/EndpointUrl';
import { defaultEndpointUrls } from '../constants/url_constant';
import { endpointUrlColors } from '../constants/color_constant';

const endpointUrlHelper = (() => {
  return {
    generateShortcutData,
  }

  function generateShortcutData(url) {
    const shortcutData = _getDefaultEndpointShortcutData(url);
    return !!shortcutData ? shortcutData : _getCustomShortcut(url);
  }

  // private method
  function _getDefaultEndpointShortcutData(url) {
    const endpointUrlData = defaultEndpointUrls.filter(defaultEndpointUrl => defaultEndpointUrl.value == url)[0];

    if (!endpointUrlData) return null

    return {
      shortcut: endpointUrlData.shortcut,
      shortcut_bg_color: endpointUrlData.shortcut_bg_color,
      shortcut_text_color: endpointUrlData.shortcut_text_color,
    }
  }

  function _getCustomShortcut(url) {
    const customEndpointUrls = EndpointUrl.getAllCustomEndpointUrls();
    const color = _getCustomEndpointColor(customEndpointUrls, url);
    let orderNumber = customEndpointUrls.length > 0 ? _findCustomEndpointUrlOrder(customEndpointUrls, url) : 1;

    return {
      shortcut: `CUSTOM${orderNumber}`,
      shortcut_bg_color: color.background,
      shortcut_text_color: color.text,
    }
  }

  function _findCustomEndpointUrlOrder(customEndpointUrls, url) {
    for (let i = 0; i < customEndpointUrls.length; i++) {
      if (customEndpointUrls[i].value == url)
        return i + 1;
    }

    return customEndpointUrls.length + 1;
  }

  function _getCustomEndpointColor(customEndpointUrls, url) {
    if (customEndpointUrls.length >= 10) {
      const randomIndex = Math.floor(Math.random() * endpointUrlColors.length + 1);
      return endpointUrlColors[randomIndex];
    }

    const index = customEndpointUrls.findIndex(endpoint => endpoint.value === url);
    return endpointUrlColors[index];
  }
})()

export default endpointUrlHelper;