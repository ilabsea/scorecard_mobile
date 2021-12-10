import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import CreateNewIndicatorParticipantInfo from './CreateNewIndicatorParticipantInfo';
import CriteriaSelection from '../RaisingProposed/CriteriaSelection';
import RaisingProposedCustomIndicatorList from '../RaisingProposed/RaisingProposedCustomIndicatorList';

import IndicatorService from '../../services/indicator_service';
import { getDeviceStyle, mobileSubTitleSize } from '../../utils/responsive_util';

const headerTitleSize = getDeviceStyle(18, mobileSubTitleSize());

class CreateNewIndicatorContent extends Component {
  static contextType = LocalizationContext;

  updateSelectedParticipant(participantUuid) {
    const indicatorAttrs = new IndicatorService().getIndicatorList(this.props.scorecardUuid, '', []);
    const dataset = {
      indicators: indicatorAttrs.indicators,
      selected_indicators: indicatorAttrs.selectedIndicators,
      participant_uuid: participantUuid
    };

    !!this.props.updateSelectedParticipant && this.props.updateSelectedParticipant(dataset);
  }

  renderParticipant() {
    if (this.props.isSearching || this.props.isEdit)
      return;

    return (
      <CreateNewIndicatorParticipantInfo
        scorecardUuid={this.props.scorecardUuid}
        participantUuid={this.props.participantUuid}
        navigation={this.props.navigation}
        updateSelectedParticipant={(participantUuid) => this.updateSelectedParticipant(participantUuid)}
      />
    )
  }

  renderCriteriaList() {
    return (
      <CriteriaSelection
        selectIndicator={this.props.selectIndicator}
        scorecardUuid={this.props.scorecardUuid}
        participantUuid={this.props.participantUuid}
        indicators={this.props.indicators}
        selectedIndicators={this.props.selectedIndicators}
        unselectedIndicators={this.props.unselectedIndicators}
        customIndicator={this.props.customIndicator}
        isSearching={this.props.isSearching}
      />
    )
  }

  renderCustomIndicatorList() {
    return (
      <RaisingProposedCustomIndicatorList
        scorecardUuid={this.props.scorecardUuid}
        indicators={this.props.indicators}
        editCustomIndicator={this.props.editCustomIndicator}
        selectedCustomIndicator={this.props.selectedCustomIndicator}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.renderParticipant() }

        { (!this.props.isSearching && !this.props.isEdit) &&
          <Text style={{fontSize: headerTitleSize, color: Color.lightBlackColor, marginTop: 20}}>
            {this.context.translations.chooseProposedIndicator}
          </Text>
        }

        { !this.props.isEdit ? this.renderCriteriaList() : this.renderCustomIndicatorList() }
      </View>
    )
  }
}

export default CreateNewIndicatorContent;