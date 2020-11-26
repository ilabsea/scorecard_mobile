import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {LocalizationContext} from '../Translations';

class UserTable extends Component {
  static contextType = LocalizationContext;
  isDisability = (isDisability) => {
    return isDisability ? 'Yes' : isDisability !== '' ? 'No' : '';
  }

  indicatorBadge = (proposedCriterias) => {
    if (proposedCriterias != null && proposedCriterias.length > 0) {
      return proposedCriterias.map((proposedCriteria, index) => {
        return (
          <View key={index} style={styles.indicatorBadge}>
            <Text style={styles.indicatorLabel}>
              {proposedCriteria.indicatorable_name.split(':')[0]}
            </Text>
          </View>
        );
      });
    }
  }

  editParticipant = (participantUUID) => {
    this.props.navigation.navigate('CreateNewIndicator', {uuid: this.props.scorecardUUID, participant_uuid: participantUUID});
  }

  editButton = (participantUUID) => {
    return (
      <TouchableOpacity onPress={() => this.editParticipant(participantUUID)}
        style={{flexDirection: 'row', alignSelf: 'center'}}
        >
        <MaterialIcon name="edit" color="#e4761e" size={18}/>
        <Text style={{color: '#e4761e', textTransform: 'uppercase', fontWeight: '700', marginLeft: 4}}>Edit</Text>
      </TouchableOpacity>
    );
  }

  getCellData = (cellData, cellIndex) => {
    if (cellIndex === 3)
      return this.isDisability(cellData);
    else if (cellIndex === 4)
      return this.indicatorBadge(cellData);
    else if (cellIndex === 6)
      return this.editButton(cellData);
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
                    <Cell key={cellIndex} data={this.getCellData(cellData, cellIndex)} textStyle={styles.text} />
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
    paddingHorizontal: 2,
    paddingVertical: 2,
    justifyContent: 'center',
    marginRight: 4,
  },
  indicatorLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: '#787878',
    padding: 5,
    borderRadius: 3,
  },
});

export default UserTable;