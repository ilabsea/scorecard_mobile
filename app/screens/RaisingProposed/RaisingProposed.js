import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import NoUserListing from '../../components/RaisingProposed/NoUserListing';
import UserListing from '../../components/RaisingProposed/UserListing';
import ProgressHeader from '../../components/ProgressHeader';

class RaisingProposed extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
  }

  openCreateNewIndicatorScreen = () => {
    this.props.navigation.navigate('CreateNewIndicator', {uuid: this.props.route.params.uuid});
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
        <UserListing
          uuid={this.props.route.params.uuid}
          openCreateNewIndicatorScreen={() => this.openCreateNewIndicatorScreen()}
          navigation={this.props.navigation}
        />
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