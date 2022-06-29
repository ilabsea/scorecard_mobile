import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import {LocalizationContext} from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import Accordion from '../Accordion';
import ProposedIndicatorMethodDetailsContent from './ProposedIndicatorMethodDetailsContent';

import scorecardTracingStepsService from '../../services/scorecard_tracing_steps_service';
import settingHelper from '../../helpers/setting_helper';
import { bodyFontSize } from '../../utils/font_size_util';
import { containerPadding } from '../../utils/responsive_util';
import { INDICATOR_BASE, PARTICIPANT_BASE } from '../../constants/proposed_indicator_method_constant';

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
    this.setState({ selectedMethod: await settingHelper.getSelectedProposedIndicatorMethodName() });
  }

  renderAccordionTitle(item) {
    return <View style={{flex: 2}}><Text style={{fontSize: bodyFontSize()}}>{item.label}</Text></View>
  }

  renderAccordionTitleStatus(item) {
    const {translations} = _this.context;
    const selectLabel = _this.state.selectedMethod === item.value ? translations.selected : translations.select;
    const textColor = _this.state.selectedMethod === item.value ? Color.lightGrayColor : Color.clickableColor;

    return <Text style={{ color: textColor, fontFamily: FontFamily.title, fontSize: bodyFontSize() }}>{ selectLabel }</Text>
  }

  renderAccordionContent(item) {
    return <ProposedIndicatorMethodDetailsContent proposeMethod={item} />
  }

  onToggle(proposedIndicatorMethod) {
    scorecardTracingStepsService.trace(null, settingHelper.getProposedIndicatorMethodTracingStep(proposedIndicatorMethod.value), this.props.email);

    _this.setState({ selectedMethod: proposedIndicatorMethod.value}, () => {
      _this.savedSetting.proposedIndicatorMethod = this.state.selectedMethod;
      AsyncStorage.setItem('SETTING', JSON.stringify(_this.savedSetting));
    });
  }

  render() {
    const { translations } = this.context;
    const proposedIndicatorMethods = [
      { label: translations.indicatorBased, value: INDICATOR_BASE, description: translations.indicatorBasedDescription },
      { label: translations.participantBased, value: PARTICIPANT_BASE, description: translations.participantBasedDescription }
    ];

    return (
      <View>
        <BottomSheetModalTitle title={ translations.detailOfProposedIndicatorMethods } />

        <View style={{padding: containerPadding}}>
          <Accordion
            items={proposedIndicatorMethods}
            leftComponent={this.renderAccordionTitle}
            accordionTitle={this.renderAccordionTitleStatus}
            accordionContent={this.renderAccordionContent}
            titleStyle={{ textAlign: 'right' }}
            customItemStyle={{ backgroundColor: '#f9f9fa', borderWidth: 1, borderColor: Color.paleGrayColor }}
            accordionStatuses={this.props.accordionStatuses}
            hasAutoToggle={true}
            onToggle={(item) => this.onToggle(item)}
          />
        </View>
      </View>
    )
  }
}

export default ProposedIndicatorMethodDetails;