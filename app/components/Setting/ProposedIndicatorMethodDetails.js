import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import Accordion from '../Accordion';

import settingHelper from '../../helpers/setting_helper';
import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { getProposedIndicatorMethod } from '../../utils/proposed_indicator_util';
import { INDICATOR_BASE, PARTICIPANT_BASE } from '../../constants/main_constant';
import { navigationRef } from '../../navigators/app_navigator';

let _this = null;

class ProposedIndicatorMethodDetails extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedMethod: INDICATOR_BASE,
    }

    this.savedSetting = null;
    _this = this;
  }

  async componentDidMount() {
    this.savedSetting = JSON.parse(await AsyncStorage.getItem('SETTING')) || { proposedIndicatorMethod: INDICATOR_BASE };
    this.setState({ selectedMethod: await getProposedIndicatorMethod() });
  }

  renderAccordionTitle(item) {
    const {translations} = _this.context;
    const selectLabel = _this.state.selectedMethod === item.value ? translations.selected : translations.select;
    const textColor = _this.state.selectedMethod === item.value ? Color.lightGrayColor : Color.clickableColor;
    const titleWidth = getDeviceStyle(wp('81%'), wp('73%'));

    return <View style={{ flexDirection: 'row', width: titleWidth, position: 'relative' }}>
            <Text style={{flex: 1, fontSize: bodyFontSize()}}>{item.label}</Text>
            <Text style={{ color: textColor, fontFamily: FontFamily.title, fontSize: bodyFontSize() }}>{ selectLabel }</Text>
           </View>
  }

  renderAccordionContent(item) {
    return (
      <View style={{ backgroundColor: '#fbf9ed', borderColor: '#e6e7e9', borderWidth: 1 }}>
        { _this.renderContent(item) }
      </View>
    )
  }

  renderContent(item) {
    return (
      <View style={{padding: containerPadding}}>
        <Text style={{fontSize: bodyFontSize()}}>
          { item.description }
        </Text>

        <TouchableOpacity onPress={() => this.showVideoPlayer(item)} style={{ flexDirection: 'row', marginTop: 30 }}>
          <Icon name='play-circle-filled' size={20} color={Color.clickableColor} style={{padding: 0, marginRight: 5, marginTop: 3, height: 20}} />

          <Text style={{color: Color.clickableColor, fontSize: bodyFontSize()}}>{ _this.context.translations.clickHereToWatchHowToProposeIndicator }</Text>
        </TouchableOpacity>
      </View>
    )
  }

  showVideoPlayer(item) {
    navigationRef.current?.reset({ index: 1, routes: [
      { name: 'VideoPlayer', params: { video_id: item.video_id, title: item.label } }
    ]});
  }

  onToggle(toggleIndex) {
    _this.setState({ selectedMethod: settingHelper.getProposedIndicatorMethodByIndex(toggleIndex)}, () => {
      _this.savedSetting.proposedIndicatorMethod = this.state.selectedMethod;
      AsyncStorage.setItem('SETTING', JSON.stringify(_this.savedSetting));
    });
  }

  render() {
    const { translations } = this.context;
    const proposedIndicatorMethods = [
      { label: translations.indicatorBase, value: INDICATOR_BASE, description: translations.indicatorBaseDescription, video_id: 'f7OPcDX_LyI' },
      { label: translations.participantBase, value: PARTICIPANT_BASE, description: translations.participantBaseDescription, video_id: 'Il0S8BoucSA' }
    ];

    return (
      <View>
        <BottomSheetModalTitle title={ translations.detailOfProposedIndicatorMethods } />

        <View style={{padding: containerPadding}}>
          <Accordion
            items={proposedIndicatorMethods}
            accordionTitle={this.renderAccordionTitle}
            accordionContent={this.renderAccordionContent}
            customItemStyle={{ backgroundColor: '#f9f9fa', borderWidth: 1, borderColor: Color.paleGrayColor }}
            accordionStatuses={this.props.accordionStatuses}
            hasAutoToggle={true}
            onToggle={(toggleIndex) => this.onToggle(toggleIndex)}
          />
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorMethodDetails;