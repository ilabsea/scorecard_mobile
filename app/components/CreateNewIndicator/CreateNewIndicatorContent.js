import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import CreateNewIndicatorParticipantInfo from './CreateNewIndicatorParticipantInfo';
import IndicatorList from '../RaisingProposed/IndicatorList';

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

  renderIndicatorList() {
    return (
      <IndicatorList
        isEdit={this.props.isEdit}
        isSearching={this.props.isSearching}
        scorecardUuid={this.props.scorecardUuid}
        participantUuid={this.props.participantUuid}
        indicators={this.props.indicators}
        selectedIndicators={this.props.selectedIndicators}
        unselectedIndicators={this.props.unselectedIndicators}
        groupedIndicators={this.props.groupedIndicators}
        customIndicator={this.props.customIndicator}
        editCustomIndicator={this.props.editCustomIndicator}
        selectedCustomIndicator={this.props.selectedCustomIndicator}
        selectIndicator={this.props.selectIndicator}
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

        { this.renderIndicatorList() }
      </View>
    )
  }
}

export default CreateNewIndicatorContent;