import {localeDictionary} from '../constants/locale_constant';

const getLocaleChoices = (localeCodes) => {
  let localeChoices = [];
  localeCodes.map((code) => {
    const locale = {label: localeDictionary[code], value: code};
    localeChoices.push(locale);
  });

  return localeChoices;
};

const getLocaleOptions = (locales) => {
  const localeOptions = locales.map((locale) => ({value: locale.code, label: locale.name}));
  return localeOptions;
};

export {getLocaleChoices, getLocaleOptions};