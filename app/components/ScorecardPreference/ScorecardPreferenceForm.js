import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info'

import {LocalizationContext} from '../Translations';
import HeaderTitle from '../HeaderTitle';
import DatePicker from '../DatePicker';
import ScorecardPreferenceLanguagePickers from './ScorecardPreferenceLanguagePickers'

import Color from '../../themes/color';
import { todayDate } from '../../utils/date_util';
import scorecardPreferenceService from '../../services/scorecard_preference_service';
import { containerPadding, containerPaddingTop, getDeviceStyle } from '../../utils/responsive_util';

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

  changeDate = (date) => {
    this.setState({ date });
    this.props.changeValue('date', date);
  }

  updateContainerPadding = (isExpand) => {
    this.setState({ containerPaddingBottom: isExpand ? getDeviceStyle(28, hp('30%')) : 0 });
  }
  
  onTextLanguageOpen = () => {
    this.setState({ openDropDownType: 'text' });

    if (!DeviceInfo.isTablet())
      this.updateContainerPadding(true);
  }

  onAudioLanguageOpen = () => {
    this.setState({ openDropDownType: 'audio' });
    this.updateContainerPadding(true);
  }

  onCloseDropDown = (type) => {
    if (type == this.state.openDropDownType)
      this.updateContainerPadding(false);
  }

  onChangeLocale(type, item) {
    const languages = {
      'TEXT_LANG': { state: { textLocale: item.value }, label: 'textLocale' },
      'AUDIO_LANG': { state: { audioLocale: item.value }, label: 'audioLocale' }
    };
    this.setState(languages[type].state);
    this.props.changeValue(languages[type].label, item.value)
  }

  renderLanguagePickers() {
    const hasScorecardDownload = scorecardPreferenceService.hasScorecardDownload(this.props.scorecard.uuid);

    return <ScorecardPreferenceLanguagePickers
              languages={this.props.languages}
              textLocale={this.state.textLocale}
              audioLocale={this.state.audioLocale}
              onChangeLocale={(type, item) => this.onChangeLocale(type, item)}
              pickerRef={this.props.pickerRef}
              pickerModalRef={this.props.pickerModalRef}
              disabled={hasScorecardDownload}
           />
  }

  renderForm = () => {
    return (
      <View style={{marginTop: 10}}>
        <DatePicker
          date={this.state.date}
          onChangeDate={this.changeDate}
          scorecard={this.props.scorecard}
        />

        { this.renderLanguagePickers() }
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