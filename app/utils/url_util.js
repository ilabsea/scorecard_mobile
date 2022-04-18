import { urlPrefixes } from '../constants/url_constant';

const urlUtil = (() => {
  return {
    isUrlValid,
    isValidIpAddress,
    isValidDomainName,
    getUrlDefaultLabel,
  }

  function isUrlValid(url) {
    return isValidDomainName(url) || isValidIpAddress(url);
  }

  function isValidIpAddress(value) {
    const endpoint = value.replace(urlPrefixes[0], '').replace(urlPrefixes[1], '');
    const ipPattern = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
    const portParttern = '[0-9]{1,5}'
    const regex = new RegExp(`^${ipPattern}\\.${ipPattern}\\.${ipPattern}\\.${ipPattern}\\:${portParttern}$`)

    return regex.test(endpoint);
  }

  function isValidDomainName(url) {
    const regexp = new RegExp('(https|http?)://?[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]+(\\.[^\s])');
    return regexp.test(url);
  }

  function getUrlDefaultLabel(url) {
    return isValidIpAddress(url) ? 'Local Development Server' : 'Development Server';
  }
})();

export default urlUtil;