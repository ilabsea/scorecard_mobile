import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import SelectPicker from '../SelectPicker';
import HeaderTitle from '../HeaderTitle';
import DatePicker from '../DatePicker';

import Color from '../../themes/color';
import { todayDate } from '../../utils/date_util';
import scorecardPreferenceService from '../../services/scorecard_preference_service';
import { isShortScreenDevice, containerPadding, containerPaddingTop, getDeviceStyle } from '../../utils/responsive_util';

class ScorecardPreferenceForm extends Component {
  static contextType = LocalizationContext;
  state = {
    containerPaddingBottom: 0
  }

  constructor(props) {
    super(props);

    this.state = {
      date: props.scorecard.conducted_date || todayDate(),
      textLocale: props.scorecard.text_language_code || '',
      audioLocale: props.scorecard.audio_language_code || '',
      openDropDownType: null,
    };

    this.textLanguageController;
    this.audioLanguageController;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.textLocale != state.textLocale || props.audioLocale != state.audioLocale)
      return { 
        textLocale: props.textLocale,
        audioLocale: props.audioLocale,
      };

    return {};
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

  updateContainerPadding = (isExpand) => {
    this.setState({ containerPaddingBottom: isExpand ? getDeviceStyle(28, hp('30%')) : 0 });
  }
  
  onTextLanguageOpen = () => {
    this.setState({ openDropDownType: 'text' });
    this.audioLanguageController.close();

    if (isShortScreenDevice())
      this.updateContainerPadding(true);
  }

  onAudioLanguageOpen = () => {
    this.setState({ openDropDownType: 'audio' });
    this.textLanguageController.close();
    this.updateContainerPadding(true);
  }

  onCloseDropDown = (type) => {
    if (type == this.state.openDropDownType)
      this.updateContainerPadding(false);
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
          scorecard={this.props.scorecard}
        />

        <SelectPicker
          items={this.props.languages}
          selectedItem={this.state.textLocale}
          label={translations["textDisplayIn"]}
          placeholder={translations["selectLanguage"]}
          searchablePlaceholder={translations["searchForLanguage"]}
          zIndex={6000}
          onChangeItem={this.changeTextLocale}
          customDropDownContainerStyle={{marginTop: 10}}
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
      <ScrollView contentContainerStyle={[styles.container, { paddingBottom: this.state.containerPaddingBottom }]}>
        <HeaderTitle headline="scorecardPreference" subheading="pleaseFillInformationBelow" />

        {this.renderForm()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Color.whiteColor,
    padding: containerPadding,
    paddingTop: containerPaddingTop,
  },
});

export default ScorecardPreferenceForm;