import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
import { LocalizationContext } from '../Translations';
import ModalConfirmationButtons from '../ModalConfirmationButtons';

import scorecardService from '../../services/scorecardService';
import scorecardProgress from '../../db/jsons/scorecardProgress';

import { FontFamily } from '../../assets/stylesheets/theme/font';

class ScorecardProgressContent extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      scorecard: scorecardService.find(this.props.scorecardUuid),
    };
  }

  renderContent = () => {
    const { translations } = this.context;
    const step = scorecardProgress[this.state.scorecard.status - 1];

    return (
      <View>
        <Text style={CustomStyle.modalTitle}>
          { translations.scorecardIsInStep } {this.state.scorecard.status}/5
        </Text>

        <View style={{marginTop: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text>
            { translations.thisScorecardIsInStep }
          </Text>
          <Text style={{ fontFamily: FontFamily.title }}> "{ translations[step.label] }"</Text>
        </View>
      </View>
    );
  }

  continueScorecard = () => {
    const step = scorecardProgress[this.state.scorecard.status - 1];
    this.props.onDismiss();
    this.props.navigation.navigate(step.routeName, { scorecard_uuid: this.props.scorecardUuid, local_ngo_id: this.state.scorecard.local_ngo_id });
  }

  render() {
    const { translations } = this.context;

    return (
      <View>
        { this.renderContent() }

        <ModalConfirmationButtons
          onClose={() => this.props.onDismiss()}
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