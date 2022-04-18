import { urlPrefixes } from '../constants/url_constant';

const isBlank = (value) => {
  if (value === '' || value === undefined || value === null)
    return true;

  return false;
}

// Check if string contains only digits
const isNumber = (value) => {
  return /^\d+$/.test(value);
}

const extractNumber = (value) => {
  return value.replace(/[^0-9]/g, '');
}

const isIpAddress = (value) => {
  let endpoint = value;
  urlPrefixes.map(urlPrefix => {
    if (value.includes(urlPrefix))
      endpoint = value.replace(urlPrefix, '')
  });

  const ipPattern = '(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]?|0)';
  const portParttern = '[0-9]{1,5}'
  const regex = new RegExp(`^${ipPattern}\\.${ipPattern}\\.${ipPattern}\\.${ipPattern}\\:${portParttern}$`)

  return regex.test(endpoint);
}

export { isBlank, isNumber, extractNumber, isIpAddress }