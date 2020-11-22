import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {LocalizationContext} from '../Translations';

class UserTable extends Component {
  static contextType = LocalizationContext;
  isDisabled = (isDisabled) => {
    return isDisabled ? 'Yes' : 'No';
  }

  indicatorBadage = (indicator) => {
    if (indicator != null && indicator != '') {
      return (
        <View style={styles.indicatorBadge}>
          <Text style={styles.indicatorLabel}>{indicator}</Text>
        </View>
      );
    }
  }

  editParticipant = (participantUUID) => {
    this.props.navigation.navigate('CreateNewIndicator', {uuid: this.props.scorecardUUID, participant_uuid: participantUUID});
  }

  editButton = (participantUUID, rowIndex) => {
    return (
      <TouchableOpacity onPress={() => this.editParticipant(participantUUID)}
        style={{flexDirection: 'row', alignSelf: 'center'}}
        >
        <MaterialIcon name="edit" color="#e4761e" size={18}/>
        <Text style={{color: '#e4761e', textTransform: 'uppercase', fontWeight: '700', marginLeft: 4}}>Edit</Text>
      </TouchableOpacity>
    );
  }

  getCellData = (cellData, cellIndex, rowIndex) => {
    if (cellIndex === 3)
      return this.isDisabled(cellData);
    else if (cellIndex === 4)
      return this.indicatorBadage(cellData);
    else if (cellIndex === 6)
      return this.editButton(cellData, rowIndex);
    else
      return cellData;
  }

  render() {
    const {translations} = this.context;
    const {tableData} = this.props;
    const tableHead = [
      translations['no'],
      translations['age'],
      translations['gender'],
      translations['disability'],
      translations['indicatorType'],
      translations['note'],
      translations['action'],
    ];

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#c1c1c1'}}>
          <Row data={tableHead} style={styles.tableHead} textStyle={styles.headerText} />
          {
            tableData.map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={styles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={this.getCellData(cellData, cellIndex, rowIndex)} textStyle={styles.text} />
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
  indicatorBadge: {
    backgroundColor: '#787878',
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderRadius: 3,
  },
  indicatorLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  }
});

export default UserTable;