import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorMethodDetails from './ProposedIndicatorMethodDetails';
import BottomSheetPicker from '../BottomSheetPicker/BottomSheetPicker';

import settingHelper from '../../helpers/setting_helper';
import { INDICATOR_BASE } from '../../constants/main_constant';
import { settingModalSnapPoints } from '../../constants/modal_constant';

class SettingProposedIndicatorMethodPicker extends React.Component {
  static contextType = LocalizationContext;

  async showModal() {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING')) || null;
    const accordionStatuses = settingHelper.getProposedIndicatorMethodStatuses(savedSetting);
    this.props.formRef.current?.setSnapPoints(settingModalSnapPoints);
    this.props.formRef.current?.setBodyContent(<ProposedIndicatorMethodDetails accordionStatuses={accordionStatuses} email={this.props.email} />);
    this.props.formModalRef.current?.present();
  }

  render() {
    return (
      <BottomSheetPicker
        title={this.context.translations.proposedIndicatorMethod}
        label={this.props.proposedIndicatorMethod == INDICATOR_BASE ? this.context.translations.indicatorBase : this.context.translations.participantBase}
        selectedValue={this.props.proposedIndicatorMethod}
        showModal={() => this.showModal()}
      />
    )
  }
}

export default SettingProposedIndicatorMethodPicker;
