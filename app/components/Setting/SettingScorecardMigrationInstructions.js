import React from 'react';
import { Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import MessageWithSteps from '../MessageWithSteps';
import { smallTextFontSize } from '../../utils/font_size_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

class SettingScorecardMigrationInstructions extends React.Component {
  static contextType = LocalizationContext;
  renderBoldText(text) {
    return <Text style={{fontFamily: FontFamily.title, fontSize: smallTextFontSize()}}>{ text }</Text>
  }

  render() {
    const {translations} = this.context;
    const instructions = [
      { description: translations.selectYourPreviousServerUrl },
      { description: translations.enterYourEmailAndPassword },
      { description: translations.formatString(translations.clickOnButtonSave, this.renderBoldText(`"${translations.save}"`)) },
    ]

    return <MessageWithSteps
              header={translations.formatString(translations.cscMobileRequiresUserToReauthenticationToProceedExistingScorecard, this.renderBoldText('1.5.2'))}
              steps={instructions}
              containerStyle={{paddingHorizontal: 0, marginTop: 18}}
              headerStyle={{marginBottom: 5}}
            />
  }
}

export default SettingScorecardMigrationInstructions;