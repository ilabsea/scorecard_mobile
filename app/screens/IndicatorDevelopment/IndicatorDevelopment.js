import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { Icon } from 'native-base';

import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import ProgressHeader from '../../components/ProgressHeader';
import ActionButton from '../../components/ActionButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';

import ProposedCriteriaList from '../../components/ProposedCriteriaList';
import SelectedCriteriaList from '../../components/SelectedCriteriaList';

export default class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: {}
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

  _renderContent() {
    const {translations} = this.context;

    return (
      <View style={{flex: 1}}>
        <Text style={styles.h1}>Indicator Development Sections</Text>
        <Text style={styles.h2}>Choose selected indicator below</Text>

        <View style={styles.listWrapper}>
          <ProposedCriteriaList />

          <View style={{width: 20}}></View>

          <SelectedCriteriaList />
        </View>

        <ActionButton
          onPress={() => console.log('hello')}
          customBackgroundColor={Color.headerColor}
          label={'Next'}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        <View style={styles.container}>
          <Tip />

          { this._renderContent() }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  h2: {
    fontSize: 18,
    marginBottom: 20
  },
  listWrapper: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20
  }
})
