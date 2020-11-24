import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
} from 'react-native';

import realm from '../../db/schema';
import { LocalizationContext } from '../../components/Translations';
import ScorecardItem from '../../components/ScorecardItem';
import uuidv4 from '../../utils/uuidv4';

export default class ScorecardList extends Component {
  static contextType = LocalizationContext;

  renderList(scorecards) {
    return (scorecards.map(scorecard => (
        <ScorecardItem
          key={uuidv4()}
          onPress={() => this.onPress(scorecard)}
          scorecard={scorecard}/>
      )
    ));
  }

  onPress(scorecard) {
    this.props.navigation.navigate('ScorecardProgress', {uuid: scorecard.uuid, title: scorecard.name});
  }

  _renderNoData() {
    const { translations } = this.context

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 24}}>{translations['noData']}</Text>
      </View>
    );
  }

  render() {
    const scorecards = realm.objects('Scorecard');

    if (!scorecards.length) {
      return this._renderNoData();
    }

    return (
      <ScrollView>
        <View style={{flex: 1, padding: 16}}>
          { this.renderList(scorecards)}
        </View>
      </ScrollView>
    )
  }
}
