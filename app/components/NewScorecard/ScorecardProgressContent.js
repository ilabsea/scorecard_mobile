import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import { LocalizationContext } from '../Translations';
import ModalConfirmationButtons from '../ModalConfirmationButtons';
import OutlineInfoIcon from '../OutlineInfoIcon';

import Scorecard from '../../models/Scorecard';
import scorecardProgress from '../../db/jsons/scorecardProgress';

import { FontFamily } from '../../assets/stylesheets/theme/font';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ScorecardProgressContent extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(this.props.scorecardUuid),
    };
  }

  renderContent = () => {
    const { translations } = this.context;
    const step = scorecardProgress[this.state.scorecard.status - 1];

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <OutlineInfoIcon color={Color.warningColor} />

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={[CustomStyle.modalTitle, responsiveStyles.headerTitle]}>
              { translations.scorecardIsInStep }
            </Text>
          </View>
        </View>

        <View style={{marginTop: 15, paddingHorizontal: 22, flexDirection: 'row'}}>
          <Text style={responsiveStyles.label}>
            {translations.formatString(translations.thisScorecardIsInStep, this.props.scorecardUuid)}
            <Text style={[{ fontFamily: FontFamily.title }, responsiveStyles.label]}> "{ translations[step.label] }"</Text>
          </Text>
        </View>
      </View>
    );
  }

  continueScorecard = () => {
    const step = scorecardProgress[this.state.scorecard.status - 1];
    this.props.onDismiss(false);      // user clicked on view detail so the auto focus on text input is false
    this.props.navigation.navigate(step.routeName, { scorecard_uuid: this.props.scorecardUuid, local_ngo_id: this.state.scorecard.local_ngo_id });
  }

  render() {
    const { translations } = this.context;

    return (
      <View>
        { this.renderContent() }

        <ModalConfirmationButtons
          onClose={() => this.props.onDismiss(true)}        // // user clicked on close button, it will auto focus on the last digit input in new scorecard screen
          closeButtonLabel={translations.close}
          onConfirm={() => this.continueScorecard()}
          confirmButtonLabel={translations.continue}
          isConfirmButtonDisabled={false}
        />
      </View>
    );
  }
}

export default ScorecardProgressContent;
