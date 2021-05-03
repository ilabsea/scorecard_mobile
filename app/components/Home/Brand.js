import React, { Component } from 'react';

import {
  View,
  Image,
} from "react-native";

class Brand extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{marginTop: 40, alignItems: 'center'}}>
          <Image source={require('../../assets/images/home/csc_logo.png')} style={{width: 97, height: 97, borderWidth: 4, borderColor: 'rgba(255,255,255,0.5)', borderRadius: 10}} />
        </View>
      </View>
    );
  }
}

export default Brand;
