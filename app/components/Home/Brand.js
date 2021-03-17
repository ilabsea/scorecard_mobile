import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Image,
} from "react-native";

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { getResponsiveSize } from '../../utils/responsive_util';

class Brand extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{marginTop: 40, alignItems: 'center'}}>
          <Image source={require('../../assets/images/home/csc_logo.png')} style={styles.logo} />
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
  logo: {
    width: getResponsiveSize(97, 87),
    height: getResponsiveSize(97, 87),
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 10,
  }
});

export default Brand;
