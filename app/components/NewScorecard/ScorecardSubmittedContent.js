import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';

import { LocalizationContext } from '../Translations';
import ModalConfirmationButtons from '../ModalConfirmationButtons';

import scorecardService from '../../services/scorecardService';

class ScorecardSubmittedContent extends Component {
  static contextType = LocalizationContext;

  viewDetail = () => {
    const scorecard = scorecardService.find(this.props.scorecardUuid);
    this.props.onDismiss();
    this.props.setCurrentScorecard(scorecard);
    this.props.navigation.navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.displayName});
  }

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={CustomStyle.modalTitle}>{ translations.isSubmitted }</Text>
        <Text style={{marginTop: 10}}>
          { translations.thisScorecardIsAlreadySubmitted }
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