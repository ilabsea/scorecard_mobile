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
import indicatorHelper from '../../helpers/indicator_helper';

export default class ScorecardResultTableRow extends Component {
  static contextType = LocalizationContext;

  onPress = (fieldName, indicator, isAddNew) => {
    if (isAddNew && this.props.isScorecardFinished)
      return;

    !!this.props.onPress && this.props.onPress(fieldName, indicator);
  }

  btnAdd = (fieldName, indicator) => {
    const { translations } = this.context;
    let color = 'black';

    if (fieldName == 'suggested_action' && !this.props.criteria['suggested_action'])
      color = Color.redColor;

    return (
      <TouchableOpacity onPress={() => this.onPress(fieldName, indicator, true)} style={{alignItems: 'center'}}>
        <View style={[styles.btn, { flexDirection: 'row' }]}>
          <Text style={styles.btnText}>
            { translations.addText }
          </Text>
          { fieldName == 'suggested_action' &&
            <Text style={[{fontSize: 14}, this.textColor(color)]}> *</Text>
          }
        </View>
      </TouchableOpacity>
    );
  }

  renderEditText = (fieldName, indicator) => {
    return (
      <View style={{flexDirection: 'row', padding: 6, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => this.onPress(fieldName, indicator, false)} style={styles.btnEdit}>
          <Text style={{color: Color.whiteColor, marginRight: 6}}>{JSON.parse(this.props.criteria[fieldName]).length}</Text>
          <Icon name={'pen'} type="FontAwesome5" style={{color: Color.whiteColor, fontSize: 14}}/>
        </TouchableOpacity>
      </View>
    )
  }

  textColor = (defaultColor) => {
    return this.props.isScorecardFinished ? { color: 'gray' } : { color: defaultColor };
  }

  renderCell = (fieldName, indicator) => {
    if (!this.props.criteria[fieldName]) {
      return this.btnAdd(fieldName, indicator);
    }

    return this.renderEditText(fieldName, indicator);
  }

  indicatorText(text) {
    return (
      <View style={{ paddingHorizontal: 2}}>
        <Text style={[styles.text]}>
          {text}
          <Text style={!this.props.criteria['suggested_action'] ? { color: Color.redColor } : {}}>*</Text>
        </Text>
      </View>
    )
  }

  _renderTextCell = (text, flexNum) => (
    <Cell data={this.indicatorText(text)} textStyle={styles.text} style={{flex: flexNum}}/>
  );

  _renderMedian = () => (
    <Cell data={this.props.criteria.median} style={{flex: 2, alignItems: 'center'}}/>
  )

  render() {
    const editableFields = ['strength',  'weakness', 'suggested_action'];
    const indicator = indicatorHelper.getDisplayIndicator(this.props.criteria);

    return (
      <TableWrapper style={styles.row} borderStyle={{borderColor: Color.listItemBorderColor, borderWidth: 1}}>
        { this._renderTextCell(indicator.content || indicator.name, 4) }
        { this._renderMedian() }
        { editableFields.map((fieldName, index) => (
          <Cell key={index} data={this.renderCell(fieldName, indicator)} textStyle={styles.text} style={{flex: 3}}/>
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
    backgroundColor: Color.whiteColor
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
    color: Color.blackColor,
    fontSize: 14,
  },
  btnEdit: {
    backgroundColor: Color.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 5,
  }
});
