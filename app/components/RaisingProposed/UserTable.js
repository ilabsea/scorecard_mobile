import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {LocalizationContext} from '../Translations';
import uuidv4 from '../../utils/uuidv4';

import TextCell from './TextCell';
import IndicatorCell from './IndicatorCell';
import ActionCell from './ActionCell';

import { getDeviceStyle } from '../../utils/responsive_util';
import UserTableTabletStyles from './styles/tablet/UserTableStyle';
import UserTableMobileStyles from './styles/mobile/UserTableStyle';

const responsiveStyles = getDeviceStyle(UserTableTabletStyles, UserTableMobileStyles);

class UserTable extends Component {
  static contextType = LocalizationContext;

  editParticipant = (participantUUID) => {
    this.props.navigation.navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUUID, participant_uuid: participantUUID});
  }

  getCellComponent = (cellData, cellIndex) => {
    const { translations } = this.context;
    const tableHead = ['no', 'age', 'gender', 'disability', 'indicator', 'action'];
    const cellName = tableHead[cellIndex];

    if (cellIndex < 4)
      return this.renderTextCell(cellData, cellName);
    else if (cellIndex == 4)
      return (<IndicatorCell cellValue={cellData} cellName={cellName} />);
    
    return (<ActionCell actionLabel={translations.edit} onPress={() => this.editParticipant(cellData)} />);

  }

  renderTextCell(cellData, cellName) {
    let cellValue = cellData;

    if (cellName == 'gender' || cellName == 'disability')
      cellValue = this.getTextCellLabel(cellData);

    return ( <TextCell cellValue={cellValue} /> );
  }

  getTextCellLabel(cellData) {
    const { translations } = this.context;

    switch (cellData) {
      case 'M':
        return translations.male;
      case 'F':
        return translations.female;
      case 'other':
        return translations.otherGender;
      case true:
        return translations.optionYes;
      case false:
        return translations.optionNo;
      default:
        return '';
    }
  }

  render() {
    const { translations } = this.context;
    const { tableData } = this.props;
    const tableHead = [
      translations['no'],
      translations['age'],
      translations['gender'],
      translations['disability'],
      translations['criteria'],
      translations['action'],
    ];

    let criteriaCellIndex = 4;

    return (
      <View style={styles.container} key={uuidv4()}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#c1c1c1'}}>
          <Row data={tableHead} flexArr={[1, 1, 1, 1, 3, 1]} style={styles.tableHead} textStyle={[styles.headerText, responsiveStyles.headerText]} />
          {
            tableData.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={styles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={this.getCellComponent(cellData, cellIndex)} textStyle={styles.text} style={{flex: (cellIndex == criteriaCellIndex ? 3 : 1)}} />
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  tableHead: {
    height: 40,
    backgroundColor: '#eeeeee',
  },
  headerText: {
    margin: 6,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  text: {
    margin: 6,
    marginVertical: 10,
    textAlign: 'center',
  },
  tableWrapper: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
});

export default UserTable;
