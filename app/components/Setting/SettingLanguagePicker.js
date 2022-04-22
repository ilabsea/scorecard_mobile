import React, { useState, useContext } from 'react';

import {LocalizationContext} from '../Translations';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';
import {locales} from '../../constants/locale_constant';
import { settingLanguageSnapPoints } from '../../constants/modal_constant';

const SettingSelectPickers = (props) => {
  const { translations, appLanguage, setAppLanguage } = useContext(LocalizationContext);
  const [locale, setLocale] = useState(appLanguage);

  function changeLocale(locale) {
    setLocale(locale.value);
    setAppLanguage(locale.value);
  }

  function showModal() {
    props.formRef.current?.setSnapPoints(settingLanguageSnapPoints);
    props.formRef.current?.setBodyContent(
      <BottomSheetPickerContent
        title='selectLanguage'
        isDynamicTitle={true}
        items={locales}
        selectedItem={locale}
        onSelectItem={(item) => changeLocale(item)}
      />
    );
    props.formModalRef.current?.present();
  }

  return (
    <BottomSheetPicker
      title={translations.language}
      label={translations.selectLanguage}
      selectedItem={locale}
      selectedItemLabel={locales[locale == 'km' ? 0 : 1].label}
      showModal={() => showModal()}
      customContainerStyle={{ marginTop: 38 }}
    />
  )
}

export default SettingSelectPickers;