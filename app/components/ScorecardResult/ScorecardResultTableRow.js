import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from '../../themes/color';

import { LocalizationContext } from '../Translations';
import ScorecardResultAddButton from './ScorecardResultAddButton';
import { TableWrapper, Cell } from 'react-native-table-component';
import indicatorHelper from '../../helpers/indicator_helper';
import scorecardResultHelper from '../../helpers/scorecard_result_helper';
import { FontFamily } from '../../assets/stylesheets/theme/font';

export default class ScorecardResultTableRow extends Component {
  static contextType = LocalizationContext;

  btnColor = () => {
    return this.props.isScorecardFinished ? Color.disabledBtnBg : Color.clickableColor
  }

  onPress = (fieldName, indicator, isAddNew) => {
    if (!this.props.indicator.median|| (isAddNew && this.props.isScorecardFinished))
      return;

    !!this.props.onPress && this.props.onPress(fieldName, indicator);
  }

  btnAdd = (fieldName, indicator) => {
    let color = Color.blackColor;

    if (fieldName == 'suggested_action' && !this.props.indicator['suggested_action'])
      color = Color.redColor;

    return (
      <ScorecardResultAddButton
        onPress={() => this.onPress(fieldName, indicator, true)}
        btnStyle={[styles.btn, {borderColor: this.btnColor()}]}
        textStyle={styles.btnText}
        isScorecardFinished={this.props.isScorecardFinished}
        indicator={this.props.indicator}
      >
        { fieldName == 'suggested_action' &&
          <Text style={[{fontSize: 18}, scorecardResultHelper.btnTextColor(this.props.isScorecardFinished, this.props.indicator, color)]}> *</Text>
        }
      </ScorecardResultAddButton>
    );
  }

  renderEditText = (fieldName, indicator) => {
    return (
      <View style={{flexDirection: 'row', padding: 6, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => this.onPress(fieldName, indicator, false)} style={[styles.btnEdit, {borderColor: this.btnColor()}]}>
          <Text style={{color: this.btnColor(), marginRight: 6}}>{JSON.parse(this.props.indicator[fieldName]).length}</Text>
          <Icon name='pencil' style={{color: this.btnColor(), fontSize: 14}}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderCell = (fieldName, indicator) => {
    if (!this.props.indicator[fieldName]) {
      return this.btnAdd(fieldName, indicator);
    }

    return this.renderEditText(fieldName, indicator);
  }

  indicatorText(text) {
    return (
      <View style={{ paddingHorizontal: 2}}>
        <Text style={[styles.text]}>
          {text}
          <Text style={[{ fontSize: 18 }, !this.props.indicator['suggested_action'] ? { color: Color.redColor } : {}]}> *</Text>
        </Text>
      </View>
    )
  }

  _renderTextCell = (text, flexNum) => {
    const label = `${this.props.order}. ${text}`;
    return <Cell data={label} textStyle={styles.text} style={{flex: flexNum}}/>
  };

  _renderMedian = () => {
    const textLabel = this.props.indicator.median ? this.props.indicator.median : this.context.translations.notVoted;

    return <Cell data={textLabel} style={{flex: 2, alignItems: 'center'}} textStyle={!this.props.indicator.median ? { fontSize: 14, color: Color.redColor } : {}} />
  }

  render() {
    const editableFields = ['strength',  'weakness', 'suggested_action'];
    const languageIndicator = indicatorHelper.getDisplayIndicator(this.props.indicator);

    return (
      <TableWrapper style={styles.row} borderStyle={{borderColor: Color.listItemBorderColor, borderWidth: 1}}>
        { this._renderTextCell(languageIndicator.content, 4) }
        { this._renderMedian() }
        { editableFields.map((fieldName, index) => (
          <Cell key={index} data={this.renderCell(fieldName, languageIndicator)} textStyle={styles.text} style={{flex: 3}}/>
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
    fontSize: 18,
    fontFamily: FontFamily.body
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
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    flexDirection: 'row',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FontFamily.body
  },
  btnEdit: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 34
  }
});
