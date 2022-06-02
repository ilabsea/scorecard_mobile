import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import CreateNewIndicatorParticipantInfo from './CreateNewIndicatorParticipantInfo';
import IndicatorSelection from '../ProposedIndicator/IndicatorSelection';
import CustomIndicatorList from '../ProposedIndicator/CustomIndicatorList';
import { subTitleFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class CreateNewIndicatorMain extends Component {
  static contextType = LocalizationContext;
  state = { hasParticipantSection: false }

  componentDidMount() {
    this.setState({ hasParticipantSection: !this.props.isIndicatorBase });
  }

  renderParticipant() {
    if (this.props.isSearching || this.props.isEdit || !this.props.participantUuid)
      return;

    return (
      <CreateNewIndicatorParticipantInfo
        scorecardUuid={this.props.scorecardUuid}
        participantUuid={this.props.participantUuid}
        navigation={this.props.navigation}
        updateSelectedParticipant={(participantUuid) => this.props.updateSelectedParticipant(participantUuid)}
        formModalRef={this.props.formModalRef}
        participantModalRef={this.props.participantModalRef}
      />
    )
  }

  renderIndicatorList() {
    return (
      <IndicatorSelection
        indicators={this.props.indicators}
        scorecardUuid={this.props.scorecardUuid}
        participantUuid={this.props.participantUuid}
        isSearching={this.props.isSearching}
        isIndicatorBase={this.props.isIndicatorBase}
        showAddNewIndicatorModal={() => this.props.showAddNewIndicatorModal(null)}
        updateIndicatorList={() => this.props.updateIndicatorList()}
        formModalRef={this.props.formModalRef}
        participantModalRef={this.props.participantModalRef}
        isLoading={this.props.isLoading}
      />
    )
  }

  renderCustomIndicatorList() {
    return (
      <CustomIndicatorList
        scorecardUuid={this.props.scorecardUuid}
        indicators={this.props.indicators}
        selectForEdit={this.props.showAddNewIndicatorModal}
        selectedCustomIndicator={this.props.selectedCustomIndicator}
        updateIndicatorList={() => this.props.updateIndicatorList()}
        formModalRef={this.props.formModalRef}
        participantModalRef={this.props.participantModalRef}
      />
    )
  }

  isChooseParticipantVisible() {
    return this.props.indicators.length > 0 &&!this.props.isLoading && !this.props.isSearching && !this.props.isEdit;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { (this.state.hasParticipantSection && this.props.indicators.length > 0) && this.renderParticipant() }

        { this.isChooseParticipantVisible() &&
          <Text style={{fontSize: subTitleFontSize(), color: Color.lightBlackColor, marginTop: this.state.hasParticipantSection ? getDeviceStyle(15, 10) : 0}}>
            {this.context.translations.chooseProposedIndicator}
          </Text>
        }

        { !this.props.isEdit ? this.renderIndicatorList() : this.renderCustomIndicatorList() }
      </View>
    )
  }
}

export default CreateNewIndicatorMain;
