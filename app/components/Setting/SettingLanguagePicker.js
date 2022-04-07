import React from 'react';
import { Keyboard, View } from 'react-native';

import {LocalizationContext} from '../Translations';
import SelectPicker from '../SelectPicker';
import CustomSelectPicker from '../CustomSelectPicker';

import {locales} from '../../constants/locale_constant';

class SettingSelectPickers extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      locale: 'km',
      isDropdownOpen: false
    }
  }

  async componentDidMount() {
    this.setState({ locale: this.context.appLanguage });
  }

  changeLocale = (locale) => {
    this.setState({locale: locale.value});
    this.context.setAppLanguage(locale.value);
  }

  renderChooseLanguage() {
    return (
      // <SelectPicker
      //   items={locales}
      //   selectedItem={locale}
      //   label={translations["language"]}
      //   placeholder={translations["selectLanguage"]}
      //   searchablePlaceholder={translations["searchForLanguage"]}
      //   zIndex={5000}
      //   showCustomArrow={true}
      //   onChangeItem={this.changeLocale}
      //   mustHasDefaultValue={true}
      //   controller={(instance) => this.languageController = instance}
      //   onOpen={() => Keyboard.dismiss()}
      //   customDropDownContainerStyle={{marginTop: 27}}
      // />

      <CustomSelectPicker
        items={locales}
        selectedItem={this.state.locale}
        zIndex={6000}
        label={this.context.translations.language}
        isRequired={true}
        itemIndex={0}
        customWrapperStyle={{ marginTop: 39 }}
        onSelectItem={(item) => this.setState({ locale: item.value })}
      />
    );
  }

  render() {
    return this.renderChooseLanguage()
  }
}

export default SettingSelectPickers;