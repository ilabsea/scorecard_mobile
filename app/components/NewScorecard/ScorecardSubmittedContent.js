import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';

import { LocalizationContext } from '../Translations';
import ModalConfirmationButtons from '../ModalConfirmationButtons';

import Scorecard from '../../models/Scorecard';

import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ScorecardSubmittedContent extends Component {
  static contextType = LocalizationContext;

  viewDetail = () => {
    const scorecard = Scorecard.find(this.props.scorecardUuid);

    this.props.onDismiss();
    this.props.setCurrentScorecard(scorecard);
    this.props.navigation.navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.displayName});
  }

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={[CustomStyle.modalTitle, responsiveStyles.headerTitle]}>{ translations.isSubmitted }</Text>
        <Text style={[{marginTop: 10, marginBottom: 20}, responsiveStyles.label]}>
          { translations.formatString(translations.thisScorecardIsAlreadySubmitted, this.props.scorecardUuid) }
        </Text>

        <ModalConfirmationButtons
          onClose={() => this.props.onDismiss()}
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
