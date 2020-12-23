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
        <View style={{marginBottom: 40, marginTop: 30, alignItems: 'center'}}>
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
});

export default Brand;
