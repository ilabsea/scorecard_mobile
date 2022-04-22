import React, { useState, useContext } from 'react';

import {LocalizationContext} from '../Translations';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';
import {locales} from '../../constants/locale_constant';
import { settingLanguageSnapPoints, settingLanguageContentHeight } from '../../constants/modal_constant';

const SettingSelectPickers = (props) => {
  const { translations, appLanguage, setAppLanguage } = useContext(LocalizationContext);
  const [locale, setLocale] = useState(appLanguage);

  function changeLocale(locale) {
    setLocale(locale.value);
    setAppLanguage(locale.value);
    props.formModalRef.current?.dismiss();
  }

  function showPicker() {
    props.formRef.current?.setSnapPoints(settingLanguageSnapPoints);
    props.formRef.current?.setBodyContent(
      <BottomSheetPickerContent
        title='selectLanguage'
        isDynamicTitle={false}
        items={locales}
        selectedItem={locale}
        contentHeight={settingLanguageContentHeight}
        onSelectItem={(item) => changeLocale(item)}
      />
    );
    props.formModalRef.current?.present();
  }

  return (
    <BottomSheetPicker
      title={translations.language}
      label={translations.selectLanguage}
      items={locales}
      selectedItem={locale}
      showPicker={() => showPicker()}
      showSubtitle={false}
      customContainerStyle={{ marginTop: 38 }}
    />
  )
}

export default SettingSelectPickers;