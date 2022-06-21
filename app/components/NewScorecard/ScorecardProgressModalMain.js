import React from 'react';
import { Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import InfoModalMain from '../Share/InfoModalMain';

import Scorecard from '../../models/Scorecard';
import scorecardProgress from '../../db/jsons/scorecardProgress';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { bodyFontSize } from '../../utils/font_size_util';

class ScorecardProgressModalMain extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      scorecard: Scorecard.find(this.props.scorecardUuid),
    };
  }

  continueScorecard = () => {
    const step = scorecardProgress[this.state.scorecard.status - 1];
    this.props.onDismiss(false);      // user clicked on view detail so the auto focus on text input is false
    this.props.navigation.navigate(step.routeName, { scorecard_uuid: this.props.scorecardUuid, local_ngo_id: this.state.scorecard.local_ngo_id });
  }

  render() {
    const { translations } = this.context;
    const step = scorecardProgress[this.state.scorecard.status - 1];
    const scorecardCode = <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>
    const scorecardStep = <Text style={{ fontFamily: FontFamily.title, fontSize: bodyFontSize() }}> "{ translations[step.label] }"</Text>

    return <InfoModalMain
            title={translations.scorecardIsInStep}
            description={translations.formatString(translations.thisScorecardIsInStep, scorecardCode, scorecardStep)}
            closeButtonLabel={translations.close}
            confirmButtonLabel={translations.viewDetail}
            hasConfirmButton={true}
            isConfirmButtonDisabled={false}
            onClose={() => this.props.onDismiss(true)}         // user clicked on close button, it will auto focus on the last digit input in new scorecard screen
            onConfirm={() => this.continueScorecard()}
           />
  }
}

export default ScorecardProgressModalMain;
