import React, { Component } from 'react';
import { Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import InfoModalMain from '../Share/InfoModalMain';
import Scorecard from '../../models/Scorecard';
import { navigate } from '../../navigators/app_navigator';

class ScorecardSubmittedModalMain extends Component {
  static contextType = LocalizationContext;

  viewDetail = () => {
    const scorecard = Scorecard.find(this.props.scorecardUuid);

    this.props.onDismiss(false);           // user clicked on view detail so the auto focus on text input is false
    this.props.setCurrentScorecard(scorecard);
    navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.displayName});
  }

  render() {
    const { translations } = this.context;
    const scorecardCode = <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>

    return (
      <InfoModalMain
        title={translations.scorecardIsSubmitted}
        description={translations.formatString(translations.thisScorecardIsAlreadySubmitted, scorecardCode)}
        closeButtonLabel={translations.close}
        confirmButtonLabel={translations.viewDetail}
        hasConfirmButton={true}
        isConfirmButtonDisabled={false}
        onClose={() => this.props.onDismiss(true)}
        onConfirm={() => this.viewDetail()}
      />
    )
  }
}

export default ScorecardSubmittedModalMain;