import React, {Component} from 'react';
import { View, Text } from 'react-native';

import {LocalizationContext} from '../Translations';
import BoldLabel from '../Share/BoldLabel';
import scorecardPreferenceService from '../../services/scorecard_preference_service';
import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const modalStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ScorecardPreferenceConfirmDownloadContent extends Component {
  static contextType = LocalizationContext;

  renderBoldText(text) {
    return <BoldLabel label={text} />
  }

  render() {
    const {translations} = this.context;
    const textLocaleLabel = scorecardPreferenceService.getLocaleLabel(this.props.languages, this.props.selectedLanguage.text_locale);
    const audioLocaleLabel = scorecardPreferenceService.getLocaleLabel(this.props.languages, this.props.selectedLanguage.audio_locale);

    return (
      <View style={{marginTop: 15, marginBottom: 10, paddingHorizontal: 15}}>
        <Text style={modalStyles.label}>{translations.downloadScorecardFirstDescription}</Text>
        <Text style={[{ marginTop: 15 }, , modalStyles.label]}>
          {translations.formatString(translations.downloadScorecardSecondDescription, this.renderBoldText(this.props.scorecardUuid), this.renderBoldText(textLocaleLabel), this.renderBoldText(audioLocaleLabel))}
        </Text>
      </View>
    )
  }
}

export default ScorecardPreferenceConfirmDownloadContent;