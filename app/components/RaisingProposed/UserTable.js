import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {LocalizationContext} from '../Translations';
import {ParticipantCell} from '../../services/participant_service';
import uuidv4 from '../../utils/uuidv4';

import { getDeviceStyle } from '../../utils/responsive_util';
import UserTableTabletStyles from '../../assets/stylesheets/components/tablet/UserTableStyle';
import UserTableMobileStyles from '../../assets/stylesheets/components/mobile/UserTableStyle';

const styles = getDeviceStyle(UserTableTabletStyles, UserTableMobileStyles);

class UserTable extends Component {
  static contextType = LocalizationContext;

  editParticipant = (participantUUID) => {
    this.props.navigation.navigate('CreateNewIndicator', {scorecard_uuid: this.props.scorecardUUID, participant_uuid: participantUUID});
  }

  getCellData = (cellData, cellIndex) => {
    const { translations } = this.context;
    const tableHead = ['no', 'age', 'gender', 'disability', 'indicator', 'action'];
    const labelTranslation = {
      yes: translations.optionYes,
      no: translations.optionNo,
      male: translations.male,
      female: translations.female,
    }
    const participantCell = new ParticipantCell(tableHead[cellIndex], cellData, this.editParticipant, translations['edit'], labelTranslation);
    return participantCell.cellItem[tableHead[cellIndex]];
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
          <Row data={tableHead} flexArr={[1, 1, 1, 1, 3, 1]} style={styles.tableHead} textStyle={styles.headerText} />
          {
            tableData.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={styles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={this.getCellData(cellData, cellIndex)} textStyle={styles.text} style={{flex: (cellIndex == criteriaCellIndex ? 3 : 1)}} />
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 15,
//     backgroundColor: '#fff',
//   },
//   tableHead: {
//     height: 40,
//     backgroundColor: '#eeeeee',
//   },
//   headerText: {
//     margin: 6,
//     fontSize: 14,
//     fontWeight: '700',
//     textAlign: 'center',
//   },
//   text: {
//     margin: 6,
//     marginVertical: 10,
//     textAlign: 'center',
//   },
//   tableWrapper: {
//     flexDirection: 'row',
//     backgroundColor: '#ffffff',
//   },
// });

export default UserTable;
