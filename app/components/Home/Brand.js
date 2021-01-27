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
          <Image source={require('../../assets/images/home/csc_logo.png')} style={{width: 130, height: 130, borderWidth: 4, borderColor: 'rgba(255,255,255,0.5)', borderRadius: 10}} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  title: {
    fontFamily: FontFamily.title,
    fontSize: 32,
    color: '#fff',
    textShadowColor: '#454444',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
});

export default Brand;
