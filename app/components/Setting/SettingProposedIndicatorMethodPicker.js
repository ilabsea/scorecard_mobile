import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../Translations';
import ProposedIndicatorMethodDetails from './ProposedIndicatorMethodDetails';

import settingHelper from '../../helpers/setting_helper';
import { INDICATOR_BASE } from '../../constants/main_constant';
import { getDeviceStyle } from '../../utils/responsive_util';
import proposedIndicatorMethodPickerTabletStyles from '../../styles/tablet/SettingProposedIndicatorMethodPickerComponentStyle';
import proposedIndicatorMethodPickerMobileStyles from '../../styles/mobile/SettingProposedIndicatorMethodPickerComponentStyle';

const styles = getDeviceStyle(proposedIndicatorMethodPickerTabletStyles, proposedIndicatorMethodPickerMobileStyles);
class SettingProposedIndicatorMethodPicker extends React.Component {
  static contextType = LocalizationContext;

  async showModal() {
    const savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING')) || null;
    const accordionStatuses = settingHelper.getProposedIndicatorMethodStatuses(savedSetting);
    this.props.formRef.current?.setBodyContent(<ProposedIndicatorMethodDetails accordionStatuses={accordionStatuses} />);
    this.props.formModalRef.current?.present();
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.showModal()} style={styles.mainContainer}>
        <Text style={styles.titleLabel}>{ this.context.translations.proposedIndicatorMethod }</Text>

        <View style={styles.textContainer}>
          <Text style={styles.valueLabel}>{ this.props.proposedIndicatorMethod == INDICATOR_BASE ? this.context.translations.indicatorBase : this.context.translations.participantBase }</Text>

          <Text style={styles.chooseLabel}>
            {this.context.translations.choose}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default SettingProposedIndicatorMethodPicker;