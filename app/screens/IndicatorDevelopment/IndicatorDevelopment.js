import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';

import realm from '../../db/schema';
import { LocalizationContext } from '../../components/Translations';
import VerticalProgressStep from '../../components/VerticalProgressStep';
import Color from '../../themes/color';
import { Icon } from 'native-base';
import ProgressHeader from '../../components/ProgressHeader';
import Tip from '../../components/Tip';

export default class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: realm.objects('Scorecard')[0]
    };
  }

  _renderHeader() {
    const steps = [
      "Indicator Development Sections",
      "Top Selected Scorecard",
      "Scorecard Voting",
      "Scorecard Result"
    ];

    return (
      <ProgressHeader
        title={this.state.scorecard.name}
        onBackPress={() => this.props.navigation.goBack()}
        steps={steps}
        progressIndex={0}/>
    )
  }

  render() {
    // const scorecard = realm.objects('Scorecard').filtered(`uuid == '${this.props.route.params.uuid}'`)[0];
    // const scorecard = realm.objects('Scorecard')[0];
    const {translations} = this.context;

    return (
      <View>
        { this._renderHeader() }

        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Tip />


        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
