import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import CreateNewIndicatorParticipantInfo from './CreateNewIndicatorParticipantInfo';
import CriteriaSelection from '../RaisingProposed/CriteriaSelection';
import RaisingProposedCustomIndicatorList from '../RaisingProposed/RaisingProposedCustomIndicatorList';
import { subTitleFontSize } from '../../utils/font_size_util';

class CreateNewIndicatorContent extends Component {
  static contextType = LocalizationContext;

  renderParticipant() {
    if (this.props.isSearching || this.props.isEdit)
      return;

    return (
      <CreateNewIndicatorParticipantInfo
        scorecardUuid={this.props.scorecardUuid}
        participantUuid={this.props.participantUuid}
        navigation={this.props.navigation}
        updateSelectedParticipant={(participantUuid) => this.props.updateSelectedParticipant(participantUuid)}
      />
    )
  }

  renderCriteriaList() {
    return (
      <CriteriaSelection
        indicators={this.props.indicators}
        scorecardUuid={this.props.scorecardUuid}
        participantUuid={this.props.participantUuid}
        isSearching={this.props.isSearching}
        showAddNewIndicatorModal={() => this.props.showAddNewIndicatorModal()}
        updateIndicatorList={() => this.props.updateIndicatorList()}
      />
    )
  }

  renderCustomIndicatorList() {
    return (
      <RaisingProposedCustomIndicatorList
        scorecardUuid={this.props.scorecardUuid}
        indicators={this.props.indicators}
        selectForEdit={this.props.selectForEdit}
        selectedCustomIndicator={this.props.selectedCustomIndicator}
        updateIndicatorList={() => this.props.updateIndicatorList()}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.renderParticipant() }

        { (!this.props.isSearching && !this.props.isEdit) &&
          <Text style={{fontSize: subTitleFontSize(), color: Color.lightBlackColor, marginTop: 20}}>
            {this.context.translations.chooseProposedIndicator}
          </Text>
        }

        { !this.props.isEdit ? this.renderCriteriaList() : this.renderCustomIndicatorList() }
      </View>
    )
  }
}

export default CreateNewIndicatorContent;