import React from 'react';
import { Keyboard, View, Text, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import SelectPicker from '../SelectPicker';
import ProposedIndicatorMethodDetails from './ProposedIndicatorMethodDetails';

import { INDICATOR_BASE, PARTICIPANT_BASE } from '../../constants/main_constant';

class SettingProposedIndicatorMethodPicker extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      proposedIndicatorMethod: INDICATOR_BASE,
    }

    this.setting = null;
    this.proposedIndicatorMethodController = null;
  }

  async componentDidMount() {
    this.setting = JSON.parse(await AsyncStorage.getItem('SETTING')) || {};

    this.setState({
      proposedIndicatorMethod: !!this.setting ? this.setting.proposedIndicatorMethod : INDICATOR_BASE
    });
  }

  setSelectedItem(proposedIndicatorMethod) {
    this.setState({ proposedIndicatorMethod });
  }

  showDetail() {
    this.props.formRef.current?.setBodyContent(<ProposedIndicatorMethodDetails />);
    this.props.formModalRef.current?.present();
  }

  pickerTitle() {
    return (
      <Pressable onPress={() => this.showDetail()} style={styles.pickerTitle}>
        <Text style={{ fontSize: 12, color: Color.inputBorderLineColor }}>{ this.context.translations.proposedIndicatorMethod }</Text>
        
        <View style={{width: 23, height: 23, borderRadius: 25, backgroundColor: Color.grayColor, marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: Color.whiteColor}}>?</Text>
        </View>
      </Pressable>
    )
  }

  async onChange(proposedIndicatorMethod) {
    this.setting['proposedIndicatorMethod'] = proposedIndicatorMethod.value;

    this.setState({ proposedIndicatorMethod: proposedIndicatorMethod.value }, () => {
      AsyncStorage.setItem('SETTING', JSON.stringify(this.setting));
    });
  }

  render() {
    const {translations} = this.context;
    const types = [
      { label: translations.indicatorBase, value: INDICATOR_BASE },
      { label: translations.participantBase, value: PARTICIPANT_BASE }
    ];

    return (
      <SelectPicker
        items={types}
        selectedItem={this.state.proposedIndicatorMethod}
        label={translations.proposedIndicatorMethod}
        zIndex={6000}
        showCustomArrow={true}
        onChangeItem={(type) => this.onChange(type)}
        mustHasDefaultValue={true}
        controller={(instance) => this.proposedIndicatorMethodController = instance}
        onOpen={() => Keyboard.dismiss()}
        customDropDownContainerStyle={{marginTop: -4}}
        pickerTitle={this.pickerTitle()}
      />
    )
  }
}

const styles = StyleSheet.create({
  pickerTitle: {
    backgroundColor: Color.whiteColor,
    color: Color.inputBorderLineColor,
    fontSize: 12,
    marginLeft: 12,
    paddingHorizontal: 6,
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 5001
  }
});

export default SettingProposedIndicatorMethodPicker;