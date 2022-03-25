import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import CreateNewIndicatorParticipantInfo from './CreateNewIndicatorParticipantInfo';
import IndicatorSelection from '../RaisingProposed/IndicatorSelection';
import RaisingProposedCustomIndicatorList from '../RaisingProposed/RaisingProposedCustomIndicatorList';
import { subTitleFontSize } from '../../utils/font_size_util';

class CreateNewIndicatorContent extends Component {
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
        formRef={this.props.formRef}
        participantModalRef={this.props.participantModalRef}
      />
    )
  }

  renderCustomIndicatorList() {
    return (
      <RaisingProposedCustomIndicatorList
        scorecardUuid={this.props.scorecardUuid}
        indicators={this.props.indicators}
        selectForEdit={this.props.showAddNewIndicatorModal}
        selectedCustomIndicator={this.props.selectedCustomIndicator}
        updateIndicatorList={() => this.props.updateIndicatorList()}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.hasParticipantSection && this.renderParticipant() }

        { (!this.props.isSearching && !this.props.isEdit) &&
          <Text style={{fontSize: subTitleFontSize(), color: Color.lightBlackColor, marginTop: 20}}>
            {this.context.translations.chooseProposedIndicator}
          </Text>
        }

        { !this.props.isEdit ? this.renderIndicatorList() : this.renderCustomIndicatorList() }
      </View>
    )
  }
}

export default CreateNewIndicatorContent;
