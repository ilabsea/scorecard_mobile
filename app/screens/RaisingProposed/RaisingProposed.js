import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import UserListing from '../../components/RaisingProposed/UserListing';
import ProgressHeader from '../../components/ProgressHeader';
import realm from '../../db/schema';

class RaisingProposed extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    realm.write(() => {
      let scorecard = realm.objects('Scorecard').filtered(`uuid='${props.route.params.scorecard_uuid}'`)[0];
      if (scorecard.status < 2) {
        scorecard.status = '2';
      }
    })
  }

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
          scorecardUUID={this.props.route.params.scorecard_uuid}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default RaisingProposed;
