import {localeDictionary} from '../constants/locale_constant';

const getLocaleChoices = (localeCodes) => {
  let localeChoices = [];
  localeCodes.map((code) => {
    const localeSet = {label: localeDictionary[code], value: code};
    localeChoices.push(localeSet);
  });

  return localeChoices;
};

const getLocaleOptions = (locales) => {
  let localeOptions = [];
  locales.map((locale) => {
    const localeSet = {
      label: locale.name,
      value: locale.code,
    };
    localeOptions.push(localeSet);
  });

  return localeOptions;
};

export {getLocaleChoices, getLocaleOptions};