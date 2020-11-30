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
import BigButton from '../../components/BigButton';

class Home extends Component {
  static contextType = LocalizationContext;

  render() {
    const {translations} = this.context;

    return (
      <ImageBackground source={require('../../assets/images/bg.jpg')} style={styles.image}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/care_logo.png')} style={{width: 120, height: 120}}/>

          <View style={{marginBottom: 40, marginTop: 30}}>
            <Text style={{fontFamily: FontFamily.title, fontSize: 32, color: '#fff'}}>សូមស្វាគមន៍មកកាន់</Text>
            <Text style={{fontFamily: FontFamily.title, fontSize: 32, color: '#fff'}}>ប័ណ្ណដាក់ពន្ទុឌីជីថល</Text>
          </View>

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
  container: {
    padding: 16,
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default Home;
