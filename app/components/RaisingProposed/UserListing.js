import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import TipBox from './TipBox';
import CriteriaList from './CriteriaList';
import ListUser from './ListUser';
import BottomButton from '../BottomButton';
import {LocalizationContext} from '../../components/Translations';

import realm from '../../db/schema';

class UserListing extends Component {
  static contextType = LocalizationContext;

  onPress = () => {
    realm.write(() => {
      realm.create('Scorecard', { uuid: this.props.scorecardUUID, status: '2' }, 'modified');
    })

    this.props.navigation.navigate('IndicatorDevelopment', {scorecard_uuid: this.props.scorecardUUID});
  }

  renderFinishButton = () => {
    const {translations} = this.context;
    return (
      <View style={styles.buttonContainer}>
        <BottomButton
          label={translations['finish']}
          onPress={() => this.onPress()}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, padding: 20, paddingBottom: 28}}>
          <TipBox/>
          <CriteriaList scorecardUUID={this.props.scorecardUUID} />
          <ListUser openCreateNewIndicatorScreen={() => this.props.openCreateNewIndicatorScreen()}
            scorecardUUID={this.props.scorecardUUID}
            navigation={this.props.navigation}
          />
          {this.renderFinishButton()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 110,
    justifyContent: 'flex-end',
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default UserListing;
