import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import ScorecardSubmittedContent from './ScorecardSubmittedContent';
import ScorecardProgressContent from './ScorecardProgressContent';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardInfoModalTabletStyles from '../../styles/tablet/ScorecardInfoModalComponentStyle';
import ScorecardInfoModalMobileStyles from '../../styles/mobile/ScorecardInfoModalComponentStyle';

const responsiveStyles = getDeviceStyle(ScorecardInfoModalTabletStyles, ScorecardInfoModalMobileStyles);

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
        <Modal visible={this.props.visible} onDismiss={this.props.onDismiss}
          contentContainerStyle={[styles.container, responsiveStyles.container]}
        >
          {this._renderContent()}
        </Modal>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
});

export default ScorecardInfoModal;