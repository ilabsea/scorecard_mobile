import React, {Component} from 'react';
import { View } from "react-native";

import { LocalizationContext } from '../Translations';
import BigButton from './BigButton';
import Brand from './Brand';
import Logos from './Logos';

class HomeContent extends Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={{flex: 3}}></View>

        <Brand />

        <BigButton
          onPress={() => this.props.navigation.navigate('NewScorecard')}
          label={ this.context.translations.startScorecard }
          icon={'add-circle-sharp'}
        />

        <BigButton
          onPress={() => this.props.navigation.navigate('ScorecardList')}
          label={ this.context.translations['savedScorecard'] }
          icon={'list-circle'}
        />

        <Logos />
      </View>
    )
  }
}

export default HomeContent;