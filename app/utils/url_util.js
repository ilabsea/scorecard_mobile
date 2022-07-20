import AsyncStorage from '@react-native-community/async-storage';
import { environment } from '../config/environment';

const urlUtil = (() => {
  return {
    isUrlValid,
    isUrl,
    getAbsoluteUrl,
  }

  function isUrlValid(url) {
    const urlValidationPattern = `^https?://(${domainNameValidationPattern()}|${ipAddressValidationPattern()})$`
    const regexp = new RegExp(urlValidationPattern);
    return regexp.test(url);
  }

  function isUrl(string) {
    const matchpattern = new RegExp(`^https?://(?:www\.)?${domainNameValidationPattern()}`);
    return matchpattern.test(string)
  }

  async function getAbsoluteUrl(relativeUrl) {
    const endpointUrl = await AsyncStorage.getItem('ENDPOINT_URL') || environment.domain;
    return endpointUrl + relativeUrl;
  }

  // private method
  function ipAddressValidationPattern() {
    const octetsPattern = '[0-9]{1,3}';
    const portPattern = '[0-9]{1,5}';
    return `${octetsPattern}[.]${octetsPattern}[.]${octetsPattern}[.]${octetsPattern}[:]${portPattern}`;
  }

  function domainNameValidationPattern() {
    const addressPattern = `[a-z0-9]([-_]{1})?([.]{1})?`;
    const entityTypePattern = `([.][a-z]{2,})([/])?`;
    return `(${addressPattern})+${entityTypePattern}`
  }
})();

export default urlUtil;