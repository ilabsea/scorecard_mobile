import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Table, Row} from 'react-native-table-component';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { LocalizationContext } from '../Translations';
import ScorecardResultTableRow from './ScorecardResultTableRow';

class ScorecardResultTable extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    let tableHead = ['criteria', 'score', 'strength', 'weakness', 'suggested_action'];
    tableHead = tableHead.map(x => translations[x]);
    const tableRows = this.props.criterias;

    return (
      <Table borderStyle={{borderColor: Color.listItemBorderColor, borderWidth: 1}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[4, 2, 3, 3, 3]} />
        {
          tableRows.map((criteria, index) => (
            <ScorecardResultTableRow key={index} criteria={criteria}
              onPress={(fieldName, indicator) => this.props.handleShowModal(criteria, fieldName, indicator)}
              isScorecardFinished={this.props.scorecard.finished}
            />
          ))
        }
      </Table>
    )
  }
}

const styles = StyleSheet.create({
  head: {
    minHeight: 64,
    backgroundColor: '#eee',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontFamily: FontFamily.title,
    fontSize: 18
  },
});

export default ScorecardResultTable;