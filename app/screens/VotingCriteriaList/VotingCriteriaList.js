import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList
} from 'react-native';

import { Icon, Button, Text } from 'native-base';

import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import ProgressHeader from '../../components/ProgressHeader';
import ActionButton from '../../components/ActionButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';
import uuidv4 from '../../utils/uuidv4';

import VotingCriteriaListItem from '../../components/VotingCriteriaListItem';

export default class VotingCriteriaList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      // scorecard: realm.objects('Scorecard')[0]
    };
  }

  _renderHeader() {
    const steps = [
      "Indicator Development Sections",
      "Scorecard Voting",
      "Scorecard Result"
    ];

    return (
      <ProgressHeader
        title={"this.state.scorecard.name"}
        onBackPress={() => this.props.navigation.goBack()}
        steps={steps}
        progressIndex={1}/>
    )
  }

  _renderList() {
    let data = [1,2,3];

    return (
      <FlatList
        data={data}
        renderItem={item => <VotingCriteriaListItem criteria={item.item}/>}
        keyExtractor={item => uuidv4()}
      />
    )
  }

  _renderContent() {
    const {translations} = this.context;

    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          <Text style={[styles.h1, {flex: 1}]}>Top 5 Indicator</Text>

          <Button iconLeft style={{backgroundColor: Color.headerColor}}>
            <Icon name='plus' type="FontAwesome" />
            <Text>NEW VOTE</Text>
          </Button>

        </View>

        { this._renderList() }

        <ActionButton
          onPress={() => console.log('hello')}
          customBackgroundColor={Color.headerColor}
          label={'NEXT STEP'}/>
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
    fontWeight: 'bold',
    marginBottom: 20
  },
  listWrapper: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20
  }
})
