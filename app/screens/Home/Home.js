import React, {Component, useContext, useEffect, useState} from 'react';
import { LocalizationContext } from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import { Button } from 'react-native-paper';

import {
  ScrollView,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
} from "react-native";

import { Icon } from 'native-base';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import BigButton from '../../components/Home/BigButton';
import Brand from '../../components/Home/Brand';

class Home extends Component {
  static contextType = LocalizationContext;

  render() {
    const {translations} = this.context;

    return (
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.imageBg}>
        <View style={{alignItems: 'center'}}>
          <Brand />

          <BigButton
            onPress={() => this.props.navigation.navigate('NewScorecard')}
            label={ translations['newScorecard'] }
            icon={'add-circle-sharp'}
          />

          <BigButton
            onPress={() => this.props.navigation.navigate('ScorecardList')}
            label={ translations['savedScorecard'] }
            icon={'list-circle'}
          />
        </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Home;
