import React, { Component } from 'react';
import { Modal, Portal } from 'react-native-paper';

import ScorecardSubmittedContent from './ScorecardSubmittedContent';
import ScorecardProgressContent from './ScorecardProgressContent';

import CustomStyle from '../../themes/customStyle';

class ScorecardInfoModal extends Component {
  _renderContent = () => {
    if (this.props.isSubmitted)
      return (
        <ScorecardSubmittedContent
          onDismiss={() => this.props.onDismiss()}
          scorecardUuid={this.props.scorecardUuid}
          navigation={this.props.navigation}
          setCurrentScorecard={(scorecard) => this.props.setCurrentScorecard(scorecard)}
        />
      );

    return (
      <ScorecardProgressContent
        onDismiss={() => this.props.onDismiss()}
        scorecardUuid={this.props.scorecardUuid}
        navigation={this.props.navigation}
      />
    );
  }

  render() {
    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={this.props.onDismiss} contentContainerStyle={CustomStyle.modalContainer}>
          {this._renderContent()}
        </Modal>
      </Portal>
    );
  }
}

export default ScorecardInfoModal;