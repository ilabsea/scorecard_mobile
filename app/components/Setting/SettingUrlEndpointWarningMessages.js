import React from 'react';

import {LocalizationContext} from '../Translations';
import MessageWithSteps from '../Share/MessageWithSteps';

class EndpointUrlWarningMessages extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    const terms = [
      { label: translations.runningScorecard, description: translations.willNotBeAbleToContinueTheSetup },
      { label: translations.finishedScorecard, description: translations.willNotBeAbleToSubmit },
      { label: translations.CompletedScorecard, description: translations.willNotBeAbleToShare },
    ]

    return <MessageWithSteps
              header={translations.changingEnpiontUrlWillAffectTheScorecard}
              steps={terms}
            />
  }
}

export default EndpointUrlWarningMessages;