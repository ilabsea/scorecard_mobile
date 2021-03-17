import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import ScorecardSubmittedContent from './ScorecardSubmittedContent';
import ScorecardProgressContent from './ScorecardProgressContent';

import { getResponsiveSize } from '../../utils/responsive_util';

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
        <Modal visible={this.props.visible} onDismiss={this.props.onDismiss} contentContainerStyle={styles.container}>
          {this._renderContent()}
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    width: getResponsiveSize('70%', '75%'),
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
});

export default ScorecardInfoModal;