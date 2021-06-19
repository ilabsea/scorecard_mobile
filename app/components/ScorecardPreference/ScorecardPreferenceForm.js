import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Moment from 'moment';

import {LocalizationContext} from '../Translations';
import SelectPicker from '../SelectPicker';
import HeaderTitle from '../HeaderTitle';
import DatePicker from '../DatePicker';

import Color from '../../themes/color';

import scorecardPreferenceService from '../../services/scorecard_preference_service';

import { getDeviceStyle, isShortScreenDevice } from '../../utils/responsive_util';
import ScorecardPreferenceFormTabletStyles from '../../styles/tablet/ScorecardPreferenceFormComponentStyle';
import ScorecardPreferenceFormMobileStyles from '../../styles/mobile/ScorecardPreferenceFormComponentStyle';

const styles = getDeviceStyle(ScorecardPreferenceFormTabletStyles, ScorecardPreferenceFormMobileStyles);

class ScorecardPreferenceForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      date: props.scorecard.conducted_date || Moment().format('DD/MM/YYYY'),
      textLocale: props.scorecard.text_language_code || '',
      audioLocale: props.scorecard.audio_language_code || '',
      openDropDownType: null,
    };

    this.textLanguageController;
    this.audioLanguageController;
  }

  static getDerivedStateFromProps(props, state) {
    return { 
      textLocale: props.textLocale,
      audioLocale: props.audioLocale,
    };
  }

  closeAllSelectBox = () => {
    this.textLanguageController.close();
    this.audioLanguageController.close();
  }

  changeTextLocale = (item) => {
    this.setState({ textLocale: item.value });
    this.props.changeValue('textLocale', item.value);
  }

  changeAudioLocale = (item) => {
    this.setState({ audioLocale: item.value });
    this.props.changeValue('audioLocale', item.value);
  }

  changeDate = (date) => {
    this.setState({ date });
    this.props.changeValue('date', date);
  }

  onTextLanguageOpen = () => {
    this.setState({ openDropDownType: 'text' });
    this.audioLanguageController.close();

    if (isShortScreenDevice())
      this.props.updateContainerPadding(true);
  }

  onAudioLanguageOpen = () => {
    this.setState({ openDropDownType: 'audio' });
    this.textLanguageController.close();
    this.props.updateContainerPadding(true);
  }

  onCloseDropDown = (type) => {
    if (type == this.state.openDropDownType)
      this.props.updateContainerPadding(false);
  }

  renderForm = () => {
    const {translations} = this.context;
    const hasScorecardDownload = scorecardPreferenceService.hasScorecardDownload(this.props.scorecard.uuid);

    return (
      <View style={{marginTop: 10}}>
        <DatePicker
          date={this.state.date}
          onChangeDate={this.changeDate}
          onOpenPicker={() => this.closeAllSelectBox()}
        />

        <SelectPicker
          items={this.props.languages}
          selectedItem={this.state.textLocale}
          label={translations["textDisplayIn"]}
          placeholder={translations["selectLanguage"]}
          searchablePlaceholder={translations["searchForLanguage"]}
          zIndex={6000}
          onChangeItem={this.changeTextLocale}
          customDropDownContainerStyle={{marginTop: 30}}
          mustHasDefaultValue={true}
          controller={(instance) => this.textLanguageController = instance}
          onOpen={() => this.onTextLanguageOpen()}
          onClose={() => this.onCloseDropDown('text')}
          disabled={hasScorecardDownload}
        />

        <SelectPicker
          items={this.props.languages}
          selectedItem={this.state.audioLocale}
          label={translations["audioPlayIn"]}
          placeholder={translations["selectLanguage"]}
          searchablePlaceholder={translations["searchForLanguage"]}
          zIndex={5000}
          onChangeItem={this.changeAudioLocale}
          mustHasDefaultValue={true}
          controller={(instance) => this.audioLanguageController = instance}
          onOpen={() => this.onAudioLanguageOpen()}
          onClose={() => this.onCloseDropDown('audio')}
          disabled={hasScorecardDownload}
        />
      </View>
    );
  };

  render() {
    return (
      <View>
        <HeaderTitle
          headline="scorecardPreference"
          subheading="pleaseFillInformationBelow"
        />

        {this.renderForm()}
      </View>
    );
  }
}

export default ScorecardPreferenceForm;
