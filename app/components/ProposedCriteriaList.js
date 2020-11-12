import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

import realm from '../db/schema';
import { LocalizationContext } from './Translations';
import Color from '../themes/color';
import customStyle from '../themes/customStyle';
import uuidv4 from '../utils/uuidv4';

import ProposedCriteriaListItem from './ProposedCriteriaListItem';

export default class ProposedCriteriaList extends Component {
  static contextType = LocalizationContext;

  _renderList() {
    let data = [];
    for(let i=0; i<20; i++) {
      data.push(i+1);
    }

    return (
      <View style={[customStyle.card, { flex: 1 }]}>
        <Text style={styles.header}>Listed (15)</Text>

        <FlatList
          data={data}
          renderItem={item => <ProposedCriteriaListItem title={item.item}/>}
          keyExtractor={item => uuidv4()}
        />
      </View>
    )
  }

  render() {
    return (this._renderList());
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    padding: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: Color.listItemBorderColor
  }
})
