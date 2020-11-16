import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import NoUserListing from '../../components/RaisingProposed/NoUserListing';
import UserListing from '../../components/RaisingProposed/UserListing';
import ProgressHeader from '../../components/ProgressHeader';

class RaisingProposed extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.isVisible = false;
    this.state = {
      users: [],
    };
  }

  openCreateNewCriteriaScreen = () => {
    this.props.navigation.navigate('CreateNewIndicator');
  };

  render() {
    const {translations} = this.context;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ProgressHeader
          title={translations['getStarted']}
          onBackPress={() => this.props.navigation.goBack()}
          progressIndex={3}
        />
        <ScrollView contentContainerStyle={styles.container}>
          { this.state.users.length === 0 &&
            <NoUserListing openCreateNewCriteriaScreen={() => this.openCreateNewCriteriaScreen()}/>
          }
          { this.state.users.length > 0 &&
            <UserListing openCreateNewCriteriaScreen={() => this.openCreateNewCriteriaScreen()}/>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  }
});

export default RaisingProposed;