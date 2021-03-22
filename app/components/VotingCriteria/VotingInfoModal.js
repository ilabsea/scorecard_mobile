import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';
import VotingParticipantInfo from './VotingParticipantInfo';
import VotingAverageScoreInfo from './VotingAverageScoreInfo';

import CustomStyle from '../../themes/customStyle';

import { hasVoting } from '../../helpers/voting_criteria_helper';

class VotingInfoModal extends Component {
  static contextType = LocalizationContext;

  _renderContent() {
    if (hasVoting(this.props.scorecard.uuid)) {
      return (
        <View>
          <VotingParticipantInfo scorecard={this.props.scorecard} />

          <VotingAverageScoreInfo votingInfos={this.props.votingInfos} />
        </View>
      )
    }

    const { translations } = this.context;
    return (
      <Text style={{paddingHorizontal: 10}}>{ translations.thereIsNoVotingYet }</Text>
    );
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}
          contentContainerStyle={[CustomStyle.modalContainer, { width: '90%' }]}
        >
          <Text numberOfLines={1} style={CustomStyle.modalTitle}>
            { this.props.indicator && this.props.indicator.content }
          </Text>

          {this._renderContent()}

          <View style={CustomStyle.modalBtnWrapper}>
            <CloseButton onPress={this.props.onDismiss} label={translations.close} />
          </View>
        </Modal>
      </Portal>
    );
  }
}

export default VotingInfoModal;