import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import ModalConfirmationButtons from '../ModalConfirmationButtons';
import OutlineInfoIcon from '../OutlineInfoIcon';
import Scorecard from '../../models/Scorecard';

import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ScorecardSubmittedContent extends Component {
  static contextType = LocalizationContext;

  viewDetail = () => {
    const scorecard = Scorecard.find(this.props.scorecardUuid);

    this.props.onDismiss(false);           // user clicked on view detail so the auto focus on text input is false
    this.props.setCurrentScorecard(scorecard);
    this.props.navigation.navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.displayName});
  }

  render() {
    const { translations } = this.context;
    const scorecardCode = <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <OutlineInfoIcon color={Color.warningColor} />

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={responsiveStyles.label}>
              { translations.formatString(translations.thisScorecardIsAlreadySubmitted, scorecardCode) }
            </Text>
          </View>
        </View>

        <ModalConfirmationButtons
          onClose={() => this.props.onDismiss(true)}         // user clicked on close button, it will auto focus on the last digit input in new scorecard screen
          closeButtonLabel={translations.close}
          onConfirm={() => this.viewDetail()}
          confirmButtonLabel={translations.viewDetail}
          isConfirmButtonDisabled={false}
        />
      </View>
    );
  }
}

export default ScorecardSubmittedContent;