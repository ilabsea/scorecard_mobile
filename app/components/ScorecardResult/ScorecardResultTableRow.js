import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Icon } from 'native-base';
import Color from '../../themes/color';

import { LocalizationContext } from '../Translations';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import uuidv4 from '../../utils/uuidv4';
import ratings from '../../db/jsons/ratings';
import HTML from "react-native-render-html";

const ScorecardResultTableRow = (props) => {
  const { translations } = useContext(LocalizationContext); // 1
  const { criteria } = props;

  const onPress = (fieldName) => {
    !!props.onPress && props.onPress(fieldName);
  }

  const btnAdd = (fieldName) => (
    <TouchableOpacity onPress={() => onPress(fieldName)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{ translations.addText }</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEditText = (fieldName) => {
    return (
      <View style={{flexDirection: 'row', padding: 6, alignItems: 'center'}}>
        <View style={{flex: 1, maxHeight: 100}}>
          <HTML html={criteria[fieldName]} />
        </View>

        <TouchableOpacity onPress={() => onPress(fieldName)} style={{width: 28, height: 28, backgroundColor: Color.headerColor, justifyContent: 'center', alignItems: 'center', borderRadius: 14, marginLeft: 10}}>
          <Icon name={'pen'} type="FontAwesome5" style={{color: '#fff', fontSize: 14}}/>
        </TouchableOpacity>
      </View>
    )
  }

  const renderCell = (fieldName) => {
    if (!criteria[fieldName]) {
      return btnAdd(fieldName);
    }

    return renderEditText(fieldName);
  }

  const _renderTextCell = (text, flexNum) => (
    <Cell data={text} textStyle={styles.text} style={{flex: flexNum}}/>
  );

  const editableFields = ['strength',  'weakness', 'desired_change', 'suggested_action'];
  let median = !!criteria.median ? translations[ratings.filter(x => x.value == criteria.median)[0].label] : '';

  return (
    <TableWrapper style={styles.row} borderStyle={{borderColor: '#c1c1c1', borderWidth: 1}}>
      { _renderTextCell(criteria.tag, 4) }
      { _renderTextCell(median, 2) }
      { editableFields.map((fieldName, index) => (
        <Cell key={index} data={renderCell(fieldName)} textStyle={styles.text} style={{flex: 3}}/>
      ))}
    </TableWrapper>
  )
}

export default ScorecardResultTableRow;

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
    width: 90,
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
  }
});
