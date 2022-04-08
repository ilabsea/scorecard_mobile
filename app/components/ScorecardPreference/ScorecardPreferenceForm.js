import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DeviceInfo from 'react-native-device-info'

import {LocalizationContext} from '../Translations';
import CustomDropdownPicker from '../CustomDropdownPicker/CustomDropdownPicker';
import HeaderTitle from '../HeaderTitle';
import DatePicker from '../DatePicker';

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
      openPickerId: null,
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
    this.setState({ openPickerId: null });
  }

  // Refactor these functions
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

        <CustomDropdownPicker
          id={1}
          openId={this.state.openPickerId}
          setOpenId={(openId) => this.setState({ openPickerId: openId })}
          items={this.props.languages}
          selectedItem={this.state.textLocale}
          zIndex={6000}
          label={translations.textDisplayIn}
          itemIndex={0}
          customWrapperStyle={{ marginBottom: 0, marginTop: 20 }}
          unselectedBorder={{ borderColor: Color.grayColor, borderWidth: 2 }}
          disabled={hasScorecardDownload}
          onSelectItem={(item) => this.changeTextLocale(item)}
          onOpen={() => this.onTextLanguageOpen()}
          onClose={() => this.onCloseDropDown('text')}
        />

        <CustomDropdownPicker
          id={2}
          openId={this.state.openPickerId}
          setOpenId={(openId) => this.setState({ openPickerId: openId })}
          items={this.props.languages}
          selectedItem={this.state.audioLocale}
          zIndex={5000}
          label={translations.audioPlayIn}
          itemIndex={0}
          customWrapperStyle={{ marginBottom: 0, marginTop: 30 }}
          unselectedBorder={{ borderColor: Color.grayColor, borderWidth: 2 }}
          disabled={hasScorecardDownload}
          onSelectItem={(item) => this.changeAudioLocale(item)}
          onOpen={() => this.onTextLanguageOpen()}
          onClose={() => this.onCloseDropDown('audio')}
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