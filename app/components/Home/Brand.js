import React, { Component } from 'react';
import { LocalizationContext } from '../../components/Translations';

import {
  StyleSheet,
  View,
  Image,
  Text,
} from "react-native";

import { FontFamily } from '../../assets/stylesheets/theme/font';

class Brand extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View style={{alignItems: 'center'}}>
        <Image source={require('../../assets/images/care_logo.png')} style={styles.logo}/>

        <View style={{marginBottom: 40, marginTop: 30}}>
          <Text style={styles.title}>{ translations.welcomeTo }</Text>
          <Text style={styles.title}>{ translations.scorecardApp}</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.title,
    fontSize: 32,
    color: '#fff'
  },
  logo: {
    width: 120,
    height: 120
  }
});

export default Brand;
