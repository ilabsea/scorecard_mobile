import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from 'native-base';
import {LocalizationContext} from '../Translations';
import UserTable from './UserTable';
class ListUser extends Component {
  static contextType = LocalizationContext;
  renderUserTable = () => {
    const tableHead = ['No', 'Age', 'Gender', 'Disability', 'Indicator Type', 'Note', 'Action'];
    const tableData = [
      ['1', 34, 'M', false, 'Indicator A', '', ''],
      ['2', 23, 'F', false, 'Indicator B', '', ''],
      ['3', 24, 'M', false, 'Indicator C', '', ''],
      ['4', 27, 'F', false, 'Indicator D', '', ''],
    ];

    return (
      <UserTable tableHead={tableHead} tableData={tableData} />
    );
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{marginTop: 40}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>
            {translations['listUser']}
          </Text>
          <Button iconLeft primary style={styles.button}
            onPress={() => this.props.openCreateNewCriteriaScreen()}>
            <Icon name="add"/>
            <Text style={styles.buttonLabel}>{translations['addNewUser']}</Text>
          </Button>
        </View>
        {this.renderUserTable()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: '#22354c',
  },
  button: {
    paddingRight: 25,
    alignSelf: 'center',
    height: 50,
  },
  buttonLabel: {
    textTransform: 'uppercase',
    color: 'white',
    fontSize: 18,
    paddingLeft: 10,
  },
});

export default ListUser;