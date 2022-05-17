import React from 'react';

import {LocalizationContext} from '../Translations';
import MessageWithSteps from '../MessageWithSteps';

class EndpointUrlWarningMessages extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const terms = [
      { label: translations.runningScorecard, description: translations.willNotBeAbleToContinueTheSetup },
      { label: translations.finishedScorecard, description: translations.willNotBeAbleToSubmitTheScorecard },
      { label: translations.CompletedScorecard, description: translations.willNotBeAbleToSharePDF },
    ]

    return <MessageWithSteps
              header={translations.changingEnpiontUrlWillAffectTheScorecard}
              steps={terms}
            />
  }
}

export default EndpointUrlWarningMessages;