import React from 'react';
import { Keyboard, View } from 'react-native';

import {LocalizationContext} from '../Translations';
import SelectPicker from '../SelectPicker';

import {localeDictionary} from '../../constants/locale_constant';
import { INDICATOR_BASE, PARTICIPANT_BASE } from '../../constants/main_constant';

class SettingSelectPickers extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      locales: [],
      locale: 'km',
    }
  }

  async componentDidMount() {
    this.setState({
      locales: this.getLocales(),
      locale: this.context.appLanguage,
    });
  }

  getLocales = () => {
    const {translations} = this.context;
    let locales = translations.getAvailableLanguages();
    return locales.map((locale) => ({label: localeDictionary[locale], value: locale}));
  };

  changeLocale = (locale) => {
    this.setState({locale: locale.value});
    this.context.setAppLanguage(locale.value);
    this.resetProposedIndicatorMethodPicker();
  }

  // Reset the proposed indicator method picker in order to make selected item get updated when the user changes the language
  resetProposedIndicatorMethodPicker() {
    this.props.indicatorMethodRef.current?.proposedIndicatorMethodController.reset();
    const selectedMethod = !!this.props.indicatorMethodRef.current.state.proposedIndicatorMethod ? this.props.indicatorMethodRef.current.state.proposedIndicatorMethod : INDICATOR_BASE;

    setTimeout(() => {
      if (selectedMethod === INDICATOR_BASE) {
        // If the selected value is the first item, we need to toggle the selected value in order to make the value get updated
        this.props.indicatorMethodRef.current?.setSelectedItem(PARTICIPANT_BASE);
        this.props.indicatorMethodRef.current?.setSelectedItem(INDICATOR_BASE);
      }
      else
        this.props.indicatorMethodRef.current?.setSelectedItem(selectedMethod);
    }, 50);
  }

  onOpen() {
    this.props.indicatorMethodRef.current?.proposedIndicatorMethodController.close();
    Keyboard.dismiss();
  }

  renderChooseLanguage() {
    const {translations} = this.context;
    const {locales, locale} = this.state;

    return (
      <SelectPicker
        items={locales}
        selectedItem={locale}
        label={translations["language"]}
        placeholder={translations["selectLanguage"]}
        searchablePlaceholder={translations["searchForLanguage"]}
        zIndex={5000}
        showCustomArrow={true}
        onChangeItem={this.changeLocale}
        mustHasDefaultValue={true}
        controller={(instance) => this.languageController = instance}
        onOpen={() => this.onOpen()}
        customDropDownContainerStyle={{marginTop: 27}}
      />
    );
  }

  render() {
    return (
      <View>
        { this.renderChooseLanguage() }
      </View>
    )
  }
}

export default SettingSelectPickers;