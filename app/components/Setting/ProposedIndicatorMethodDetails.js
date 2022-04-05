import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import BottomSheetModalTitle from '../BottomSheetModalTitle';
import Accordion from '../Accordion';
import ProposedIndicatorMethodDetailsTitle from './ProposedIndicatorMethodDetailsTitle';
import ProposedIndicatorMethodDetailsContent from './ProposedIndicatorMethodDetailsContent';

import settingHelper from '../../helpers/setting_helper';
import { containerPadding } from '../../utils/responsive_util';
import { getProposedIndicatorMethod } from '../../utils/proposed_indicator_util';
import { INDICATOR_BASE, PARTICIPANT_BASE } from '../../constants/main_constant';

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
    return <ProposedIndicatorMethodDetailsTitle selectedMethod={_this.state.selectedMethod} proposeMethod={item} />
  }

  renderAccordionContent(item) {
    return <ProposedIndicatorMethodDetailsContent proposeMethod={item} />
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
      { label: translations.indicatorBase, value: INDICATOR_BASE, description: translations.indicatorBaseDescription },
      { label: translations.participantBase, value: PARTICIPANT_BASE, description: translations.participantBaseDescription }
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