import React, {Component, useContext, useEffect, useState} from 'react';
import { LocalizationContext } from '../../components/Translations';
import ActionButton from '../../components/ActionButton';

import {
  ScrollView,
  StyleSheet,
} from "react-native";

class Home extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ActionButton
          onPress={() => this.props.navigation.navigate('NewScorecard')}
          label='newScorecard'
        />
        <ActionButton
          label='savedScorecard'
          customButtonStyle={{marginTop: 26}}
        />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
