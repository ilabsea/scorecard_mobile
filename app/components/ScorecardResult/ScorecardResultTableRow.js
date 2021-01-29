import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'native-base';
import Color from '../../themes/color';

import { LocalizationContext } from '../Translations';
import { TableWrapper, Cell } from 'react-native-table-component';
import { getDisplayIndicator } from '../../services/indicator_service';

export default class ScorecardResultTableRow extends Component {
  static contextType = LocalizationContext;

  onPress = (fieldName) => {
    !!this.props.onPress && this.props.onPress(fieldName);
  }

  btnAdd = (fieldName) => {
    const { translations } = this.context;

    return (
      <TouchableOpacity onPress={() => this.onPress(fieldName)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{ translations.addText }</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderEditText = (fieldName) => {
    return (
      <View style={{flexDirection: 'row', padding: 6, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => this.onPress(fieldName)} style={styles.btnEdit}>
          <Icon name={'pen'} type="FontAwesome5" style={{color: '#fff', fontSize: 14}}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderCell = (fieldName) => {
    if (!this.props.criteria[fieldName]) {
      return this.btnAdd(fieldName);
    }

    return this.renderEditText(fieldName);
  }

  _renderTextCell = (text, flexNum) => (
    <Cell data={text} textStyle={styles.text} style={{flex: flexNum}}/>
  );

  _renderMedian = () => (
    <Cell data={this.props.criteria.median} style={{flex: 2, alignItems: 'center'}}/>
  )

  render() {
    const editableFields = ['strength',  'weakness', 'desired_change', 'suggested_action'];
    const indicator = getDisplayIndicator(this.props.criteria);

    return (
      <TableWrapper style={styles.row} borderStyle={{borderColor: '#c1c1c1', borderWidth: 1}}>
        { this._renderTextCell(indicator.content || indicator.name, 4) }
        { this._renderMedian() }
        { editableFields.map((fieldName, index) => (
          <Cell key={index} data={this.renderCell(fieldName)} textStyle={styles.text} style={{flex: 3}}/>
        ))}
      </TableWrapper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  text: {
    margin: 6,
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    minHeight: 80,
    backgroundColor: '#fff'
  },
  btn: {
    width: '85%',
    maxWidth: 90,
    height: 34,
    backgroundColor: '#cacaca',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  btnText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 14,
  },
  btnEdit: {
    width: 28,
    height: 28,
    backgroundColor: Color.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginLeft: 10
  }
});
