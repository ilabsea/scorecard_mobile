const urlUtil = (() => {
  return {
    isUrlValid,
  }

  function isUrlValid(url) {
    const urlValidationPattern = `\\bhttps?://(${domainNameValidationPattern()}|${ipAddressValidationPattern()})`
    const regexp = new RegExp(urlValidationPattern);
    return regexp.test(url);
  }

  function ipAddressValidationPattern() {
    const octetsPattern = '[0-9]{1,3}';
    const portParttern = '[0-9]{1,5}';
    return `${octetsPattern}\\.${octetsPattern}\\.${octetsPattern}\\.${octetsPattern}\\:${portParttern}$`;
  }

  function domainNameValidationPattern() {
    const addressPattern = `[A-Za-z0-9\!\@\#\$\%\^\&\*\)\(+\=\._-]`;
    const postFixPattern = `+(\\.[a-z]{2,})$`;
    return `${addressPattern}${postFixPattern}`
  }
})();

export default urlUtil;