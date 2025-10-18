import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Table, Row} from 'react-native-reanimated-table';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import { LocalizationContext } from '../Translations';
import ScorecardResultTableRow from './ScorecardResultTableRow';

class ScorecardResultTable extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;
    let tableHead = ['indicator', 'score', 'strength', 'weakness', 'suggested_action'];
    tableHead = tableHead.map(x => translations[x]);

    return (
      <Table borderStyle={{borderColor: Color.listItemBorderColor, borderWidth: 1}}>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[4, 2, 3, 3, 3]} />
        {
          this.props.indicators.map((indicator, index) => (
            <ScorecardResultTableRow key={index} indicator={indicator}
              order={index + 1}
              onPress={(fieldName, selectedIndicator) => this.props.handleShowModal(indicator, fieldName, selectedIndicator)}
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
    fontSize: 18,
  },
});

export default ScorecardResultTable;