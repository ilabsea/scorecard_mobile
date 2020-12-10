import AsyncStorage from '@react-native-community/async-storage'; // 1
import React, {createContext, useState} from 'react';
import LocalizedStrings from 'react-native-localization'; // 2
import * as RNLocalize from 'react-native-localize'; // 3
import km from '../localization/km.json';
import en from '../localization/en.json';

import realm from '../db/schema';

const DEFAULT_LANGUAGE = 'km';
const APP_LANGUAGE = 'appLanguage';
const languages = {km, en};
const translations = new LocalizedStrings(languages); // 4

export const LocalizationContext = createContext();

export const LocalizationProvider = ({children}) => { // 9
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  // 11
  const setLanguage = language => {
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  // 12
  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);

    if (currentLanguage) {
      setLanguage(currentLanguage);
    } else {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage, // 10
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
