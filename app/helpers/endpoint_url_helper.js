import EndpointUrl from '../models/EndpointUrl';
import { defaultEndpointUrls } from '../constants/url_constant';
import colorUtil from '../utils/color_util';

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
    // const randomColor = colorUtil.getRandomColor();
    let orderNumber = customEndpointUrls.length > 0 ? _findCustomEndpointUrlOrder(customEndpointUrls, url) : 1;

    return {
      shortcut: `CUSTOM${orderNumber}`,
      shortcut_bg_color: colorUtil.getRandomColor(),
      shortcut_text_color: colorUtil.getRandomColor(),
      // shortcut_bg_color: randomColor.background_color,
      // shortcut_text_color: randomColor.text_color,
    }
  }

  function _findCustomEndpointUrlOrder(customEndpointUrls, url) {
    for (let i = 0; i < customEndpointUrls.length; i++) {
      if (customEndpointUrls[i].value == url)
        return i + 1;
    }

    return customEndpointUrls.length + 1;
  }
})()

export default endpointUrlHelper;