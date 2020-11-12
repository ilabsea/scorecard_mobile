import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

import realm from '../db/schema';
import { LocalizationContext } from './Translations';
import Color from '../themes/color';
import { Icon } from 'native-base';
import customStyle from '../themes/customStyle';
import uuidv4 from '../utils/uuidv4';

import SelectedCriteriaListItem from './SelectedCriteriaListItem';

export default class IndicatorDevelopment extends Component {
  static contextType = LocalizationContext;

  _renderList() {
    let data = [];
    for(let i=0; i<2; i++) {
      data.push(i+1);
    }

    return (
      <View style={[customStyle.card, {flex: 1}]}>
        <View style={styles.header}>
          <Text style={styles.title}>Selected (2)</Text>

          <TouchableOpacity style={styles.btnRemoveAll}>
            <Icon name='remove-circle' style={styles.removeIcon} />
            <Text style={styles.textRemove}>Remove All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          renderItem={item => <SelectedCriteriaListItem title={item.item}/>}
          keyExtractor={item => uuidv4()}
        />
      </View>
    )
  }

  render() {
    return (
      this._renderList()
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.headerColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    padding: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1
  },
  textRemove: {
    color: '#fff',
    fontWeight: 'bold'
  },
  btnRemoveAll: {
    marginRight: 16,
    flexDirection: 'row'
  },
  removeIcon: {
    fontSize: 20,
    color: '#fff',
    marginRight: 4
  }
})
