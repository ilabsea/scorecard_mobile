import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';
import VotingParticipantInfo from './VotingParticipantInfo';
import VotingAverageScoreInfo from './VotingAverageScoreInfo';
import VotingMedianScoreInfo from './VotingMedianInfo';

import CustomStyle from '../../themes/customStyle';

import { hasVoting } from '../../helpers/voting_criteria_helper';

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

class VotingInfoModal extends Component {
  static contextType = LocalizationContext;

  _renderContent() {
    if (hasVoting(this.props.scorecard.uuid)) {
      return (
        <View>
          <VotingMedianScoreInfo criteria={this.props.criteria} />

          <VotingAverageScoreInfo votingInfos={this.props.votingInfos} />

          <VotingParticipantInfo scorecard={this.props.scorecard} />
        </View>
      )
    }

    const { translations } = this.context;
    return (
      <Text style={[{paddingHorizontal: 10}, responsiveStyles.normalText]}>{ translations.thereIsNoVotingYet }</Text>
    );
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}
          contentContainerStyle={[CustomStyle.modalContainer, responsiveStyles.modalContainer]}
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