import AsyncStorage from '@react-native-community/async-storage'; // 1
import React, {createContext, useState} from 'react';
import LocalizedStrings from 'react-native-localization'; // 2
import * as RNLocalize from 'react-native-localize'; // 3
import km from '../localization/km.json';
import en from '../localization/en.json';
import { environment } from '../config/environment';
import { APP_LANGUAGE } from '../constants/main_constant';

const languages = {km, en};
const translations = new LocalizedStrings(languages); // 4

export const LocalizationContext = createContext();

export const LocalizationProvider = ({children}) => { // 9
  const [appLanguage, setAppLanguage] = useState(environment.defaultLanguage);
  translations.setLanguage(appLanguage);

  // 11
  const setLanguage = language => {
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  // 12
  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);

    if (currentLanguage)
      setLanguage(currentLanguage);
    else
      setLanguage(environment.defaultLanguage);
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
