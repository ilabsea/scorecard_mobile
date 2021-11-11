import React, {Component, useContext, useEffect, useState} from 'react';
import { LocalizationContext } from '../../components/Translations';

import {
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";

import BigButton from '../../components/Home/BigButton';
import Brand from '../../components/Home/Brand';
import Logos from '../../components/Home/Logos';
import deepLinkService from '../../services/deep_link_service';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

class Home extends Component {
  static contextType = LocalizationContext;

  componentDidMount() {
    setTimeout(() => {
      deepLinkService.watchIncommingDeepLink(this.props.setCurrentScorecard);
    }, 100)
  }

  render() {
    const {translations} = this.context;

    return (
      <ImageBackground source={require('../../assets/images/home/bg.jpg')} style={styles.imageBg}>
        <View style={{alignItems: 'center', flex: 1}}>
          <View style={{flex: 3}}></View>

          <Brand />

          <BigButton
            onPress={() => this.props.navigation.navigate('NewScorecard')}
            label={ translations.startScorecard }
            icon={'add-circle-sharp'}
          />

          <BigButton
            onPress={() => this.props.navigation.navigate('ScorecardList')}
            label={ translations['savedScorecard'] }
            icon={'list-circle'}
          />

          <Logos />
        </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Home);