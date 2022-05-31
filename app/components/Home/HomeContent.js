import React, {Component} from 'react';
import { View } from "react-native";

import { LocalizationContext } from '../Translations';
import BigButton from './BigButton';
import Brand from './Brand';
import Logos from './Logos';

import Indicator from '../../models/Indicator';

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
          // onPress={() => Indicator.getAll()}
          label={ this.context.translations['savedScorecard'] }
          icon={'list-circle'}
        />

        <Logos />
      </View>
    )
  }
}

export default HomeContent;