import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';
import OutlineInfoIcon from '../OutlineInfoIcon';
import VotingParticipantInfo from './VotingParticipantInfo';
import VotingAverageScoreInfo from './VotingAverageScoreInfo';
import VotingMedianScoreInfo from './VotingMedianInfo';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';

import { isVotingCriteriaRated } from '../../helpers/voting_criteria_helper';

import { getDeviceStyle } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

class VotingInfoModal extends Component {
  static contextType = LocalizationContext;

  _renderContent() {
    if (isVotingCriteriaRated(this.props.criteria.uuid)) {
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
      <View style={{flexDirection: 'row'}}>
        <OutlineInfoIcon color={Color.warningColor} />

        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={responsiveStyles.normalText}>
            { translations.thereIsNoVotingYet }
          </Text>
        </View>
      </View>
    );
  }

  getModalWidth() {
    if (!isVotingCriteriaRated(this.props.criteria.uuid))
      return getDeviceStyle('60%', '90%');

    return '90%'
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal
          visible={this.props.visible}
          onDismiss={this.props.onDismiss}
          contentContainerStyle={[CustomStyle.modalContainer, responsiveStyles.modalContainer, { width: this.getModalWidth() } ]}
        >
          { isVotingCriteriaRated(this.props.criteria.uuid) &&
            <Text numberOfLines={1} style={CustomStyle.modalTitle}>
              { this.props.indicator && this.props.indicator.content }
            </Text>
          }

          {this._renderContent()}

          <View style={CustomStyle.modalBtnWrapper}>
            <CloseButton onPress={this.props.onDismiss} label={translations.infoCloseLabel} />
          </View>
        </Modal>
      </Portal>
    );
  }
}

export default VotingInfoModal;