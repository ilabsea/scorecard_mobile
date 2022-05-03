import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from './Translations';
import { containerPadding } from '../utils/responsive_util';
import { smallTextFontSize } from '../utils/font_size_util';
import Color from '../themes/color';
import { FontFamily } from '../assets/stylesheets/theme/font';

class EndpointUrlTermConditions extends React.Component {
  static contextType = LocalizationContext;
  renderList() {
    const { translations } = this.context;
    const terms = [
      { label: translations.runningScorecard, description: translations.willNotBeAbleToContinueTheSetup },
      { label: translations.finishedScorecard, description: translations.willNotBeAbleToSubmitTheScorecard },
      { label: translations.CompletedScorecard, description: translations.willNotBeAbleToSharePDF },
    ]

    return terms.map((term, index) => {
      return (
        <View key={index} style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 16}}>
          <Icon name="circle" size={6} color={Color.blackColor} />
          <View style={{flexDirection: 'row', marginLeft: 6}}>
            <Text style={{fontFamily: FontFamily.title, fontSize: smallTextFontSize()}}>{ term.label }: </Text>
            <Text style={{fontSize: smallTextFontSize()}}>{ term.description }</Text>
          </View>
        </View>
      )
    });
  }

  render() {
    return (
      <View style={{paddingHorizontal: containerPadding}}>
        <Text style={{fontSize: smallTextFontSize()}}>{ this.context.translations.changingEnpiontUrlWillAffectTheScorecard }:</Text>
        { this.renderList() }
      </View>
    )
  }
}

export default EndpointUrlTermConditions;