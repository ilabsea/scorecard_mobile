import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorMethodDetails from './ProposedIndicatorMethodDetails';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';

import settingHelper from '../../helpers/setting_helper';
import { INDICATOR_BASE } from '../../constants/scorecard_constant';
import { settingModalSnapPoints } from '../../constants/modal_constant';

class SettingProposedIndicatorMethodPicker extends React.Component {
  static contextType = LocalizationContext;

  async showPicker() {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING')) || null;
    const accordionStatuses = settingHelper.getProposedIndicatorMethodStatuses(savedSetting);
    this.props.formRef.current?.setSnapPoints(settingModalSnapPoints);
    this.props.formRef.current?.setBodyContent(<ProposedIndicatorMethodDetails accordionStatuses={accordionStatuses} email={this.props.email} />);
    this.props.formModalRef.current?.present();
    this.props.saveTempSettingData();
  }

  render() {
    return (
      <BottomSheetPicker
        title={this.context.translations.proposedIndicatorMethod}
        label={this.props.proposedIndicatorMethod == INDICATOR_BASE ? this.context.translations.indicatorBased : this.context.translations.participantBased}
        selectedValue={this.props.proposedIndicatorMethod}
        showPicker={() => this.showPicker()}
      />
    )
  }
}

export default SettingProposedIndicatorMethodPicker;
