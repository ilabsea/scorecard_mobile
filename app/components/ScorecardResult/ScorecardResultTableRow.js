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
import ScorecardResultAddButton from './ScorecardResultAddButton';
import { TableWrapper, Cell } from 'react-native-table-component';
import indicatorHelper from '../../helpers/indicator_helper';
import scorecardResultHelper from '../../helpers/scorecard_result_helper';

export default class ScorecardResultTableRow extends Component {
  static contextType = LocalizationContext;

  onPress = (fieldName, indicator, isAddNew) => {
    if (!this.props.criteria.median|| (isAddNew && this.props.isScorecardFinished))
      return;

    !!this.props.onPress && this.props.onPress(fieldName, indicator);
  }

  btnAdd = (fieldName, indicator) => {
    let color = Color.blackColor;

    if (fieldName == 'suggested_action' && !this.props.criteria['suggested_action'])
      color = Color.redColor;

    return (
      <ScorecardResultAddButton
        onPress={() => this.onPress(fieldName, indicator, true)}
        btnStyle={styles.btn}
        textStyle={styles.btnText}
        isScorecardFinished={this.props.isScorecardFinished}
        criteria={this.props.criteria}
      >
        { fieldName == 'suggested_action' &&
          <Text style={[{fontSize: 18}, scorecardResultHelper.btnTextColor(this.props.isScorecardFinished, this.props.criteria, color)]}> *</Text>
        }
      </ScorecardResultAddButton>
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
          <Text style={[{ fontSize: 18 }, !this.props.criteria['suggested_action'] ? { color: Color.redColor } : {}]}> *</Text>
        </Text>
      </View>
    )
  }

  _renderTextCell = (text, flexNum) => (
    <Cell data={this.indicatorText(text)} textStyle={styles.text} style={{flex: flexNum}}/>
  );

  _renderMedian = () => {
    const textLabel = this.props.criteria.median ? this.props.criteria.median : this.context.translations.notVoted;

    return <Cell data={textLabel} style={{flex: 2, alignItems: 'center'}} textStyle={!this.props.criteria.median ? { fontSize: 14, color: Color.redColor } : {}} />
  }

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
    maxWidth: 102,
    height: 34,
    backgroundColor: '#cacaca',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    flexDirection: 'row',
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
