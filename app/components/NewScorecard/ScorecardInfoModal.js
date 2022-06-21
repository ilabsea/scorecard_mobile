import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import ScorecardSubmittedModalMain from './ScorecardSubmitteModalMain';
import ScorecardProgressContent from './ScorecardProgressContent';
import InfoModalMain from '../Share/InfoModalMain';
import { LocalizationContext } from '../Translations';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardInfoModalTabletStyles from '../../styles/tablet/ScorecardInfoModalComponentStyle';
import ScorecardInfoModalMobileStyles from '../../styles/mobile/ScorecardInfoModalComponentStyle';

const responsiveStyles = getDeviceStyle(ScorecardInfoModalTabletStyles, ScorecardInfoModalMobileStyles);

class ScorecardInfoModal extends Component {
  static contextType = LocalizationContext;

  _renderContent = () => {
    if (!this.props.hasMatchedEndpoint)
      return this.renderMismatchedEndpoint();

    if (this.props.isSubmitted)
      return (
        <ScorecardSubmittedModalMain
          onDismiss={(hasAutoFocus) => this.props.onDismiss(hasAutoFocus)}
          scorecardUuid={this.props.scorecardUuid}
          navigation={this.props.navigation}
          setCurrentScorecard={(scorecard) => this.props.setCurrentScorecard(scorecard)}
        />
      );

    return (
      <ScorecardProgressContent
        onDismiss={(hasAutoFocus) => this.props.onDismiss(hasAutoFocus)}
        scorecardUuid={this.props.scorecardUuid}
        navigation={this.props.navigation}
      />
    );
  }

  renderMismatchedEndpoint() {
    const { translations } = this.context;
    const scorecardCode = <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>
    return <InfoModalMain
              title={ translations.mismatchedServerUrl }
              description={ translations.formatString(translations.mismatchedServerUrlDescription, scorecardCode) }
              onClose={() => this.props.onDismiss(false)}
           />
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