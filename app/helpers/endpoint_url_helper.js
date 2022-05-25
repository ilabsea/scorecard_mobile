import EndpointUrl from '../models/EndpointUrl';
import { defaultEndpointUrls } from '../constants/url_constant';
import { endpointUrlColors } from '../constants/color_constant';
import Color from '../themes/color';

const endpointUrlHelper = (() => {
  return {
    generateShortcutInfo,
    getColor,
  }

  function generateShortcutInfo(customEndpointUrls, url) {
    const shortcutInfo = _getDefaultEndpointShortcutInfo(url);
    return !!shortcutInfo ? shortcutInfo : _getCustomShortcutInfo(customEndpointUrls, url);
  }

  function getColor(savedColor, type) {
    if (!!savedColor)
      return savedColor;

    const colors = {
      'background': Color.grayColor,
      'text': Color.blackColor
    };
    return colors[type];
  }

  // private method
  function _getDefaultEndpointShortcutInfo(url) {
    const endpointUrl = defaultEndpointUrls.filter(defaultEndpointUrl => defaultEndpointUrl.value == url)[0];

    if (!endpointUrl) return null

    return {
      shortcut: endpointUrl.shortcut,
      shortcut_bg_color: endpointUrl.shortcut_bg_color,
      shortcut_text_color: endpointUrl.shortcut_text_color,
    }
  }

  function _getCustomShortcutInfo(customEndpoints, url) {
    const customEndpointUrls = !!customEndpoints ? customEndpoints : EndpointUrl.getAllCustomEndpointUrls();
    const color = _getCustomEndpointColor(customEndpointUrls, url);
    let orderNumber = customEndpointUrls.length > 0 ? _findCustomEndpointUrlOrder(customEndpointUrls, url) : 1;

    return {
      shortcut: `CUSTOM ${orderNumber}`,
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

    const index = customEndpointUrls.length == 0 ? 0 : customEndpointUrls.findIndex(endpoint => endpoint.value === url);
    return endpointUrlColors[index];
  }
})()

export default endpointUrlHelper;