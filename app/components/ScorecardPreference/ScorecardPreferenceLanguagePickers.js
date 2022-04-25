import React from 'react';

import {LocalizationContext} from '../Translations';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';
import BottomSheetPickerContent from '../BottomSheetPicker/BottomSheetPickerContent';

import { scorecardPreferenceLanguagePickerContentHeight } from '../../constants/modal_constant';

const TEXT_LANG = 'TEXT_LANG';
const AUDIO_LANG = 'AUDIO_LANG';

class ScorecardPreferenceLanguagePickers extends React.Component {
  static contextType = LocalizationContext;

  onSelectItem(type, item) {
    this.props.onChangeLocale(type, item);
    this.props.pickerModalRef.current?.dismiss();
  }

  showPicker(type, selectedItem) {
    const titles = {
      'TEXT_LANG': this.context.translations.textDisplayIn,
      'AUDIO_LANG': this.context.translations.audioPlayIn,
    }

    this.props.pickerRef.current?.setBodyContent(
      <BottomSheetPickerContent
        title={ titles[type] }
        items={this.props.languages}
        selectedItem={selectedItem}
        contentHeight={scorecardPreferenceLanguagePickerContentHeight}
        onSelectItem={(item) => this.onSelectItem(type, item)}
      />
    );
    this.props.pickerModalRef.current?.present();
  }

  renderTextLanguagePicker() {
    return <BottomSheetPicker
            title={this.context.translations.textDisplayIn}
            label={this.context.translations.selectLanguage}
            items={this.props.languages}
            selectedItem={this.props.textLocale}
            showSubtitle={false}
            showPicker={() => this.showPicker(TEXT_LANG, this.props.textLocale)}
            customContainerStyle={{ marginTop: 15 }}
            disabled={this.props.disabled}
          />
  }

  renderAudioLanguagePicker() {
    return <BottomSheetPicker
            title={this.context.translations.audioPlayIn}
            label={this.context.translations.selectLanguage}
            items={this.props.languages}
            selectedItem={this.props.audioLocale}
            showSubtitle={false}
            showPicker={() => this.showPicker(AUDIO_LANG, this.props.audioLocale)}
            customContainerStyle={{ marginTop: 40 }}
            disabled={this.props.disabled}
          />
  }

  render() {
    return (
      <React.Fragment>
        { this.renderTextLanguagePicker() }
        { this.renderAudioLanguagePicker() }
      </React.Fragment>
    )
  }
}

export default ScorecardPreferenceLanguagePickers;