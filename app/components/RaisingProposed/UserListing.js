import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import TipBox from './TipBox';
import CriteriaList from './CriteriaList';
import ListUser from './ListUser';
import ActionButton from '../ActionButton';
import {LocalizationContext} from '../../components/Translations';
import Color from '../../themes/color';

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
        <ActionButton
          label={translations['finish']}
          customBackgroundColor={Color.primaryButtonColor}
          onPress={() => this.onPress()}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, padding: 20}}>
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
    paddingTop: 130,
    justifyContent: 'flex-end',
    paddingBottom: 22,
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default UserListing;
