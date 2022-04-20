import React, { useState, useContext } from 'react';

import {LocalizationContext} from '../Translations';
import CustomDropdownPicker from '../CustomDropdownPicker/CustomDropdownPicker';
import {locales} from '../../constants/locale_constant';

const SettingSelectPickers = (props) => {
  const { translations, appLanguage, setAppLanguage } = useContext(LocalizationContext);
  const [locale, setLocale] = useState(appLanguage);

  function changeLocale(locale) {
    setLocale(locale.value);
    setAppLanguage(locale.value);
  }

  return (
    <CustomDropdownPicker
      id={2}
      openId={props.openPickerId}
      setOpenId={(openId) => props.setOpenPickerId(openId)}
      items={locales}
      selectedItem={locale}
      zIndex={6000}
      label={translations.language}
      isRequired={true}
      itemIndex={0}
      customWrapperStyle={{ marginTop: 39 }}
      onSelectItem={(item) => changeLocale(item)}
    />
  )
}

export default SettingSelectPickers;