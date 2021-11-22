import React, {Component, useContext, useEffect, useState} from 'react';
import { LocalizationContext } from '../../components/Translations';

import { StyleSheet, ImageBackground, View } from "react-native";

import BigButton from '../../components/Home/BigButton';
import Brand from '../../components/Home/Brand';
import Logos from '../../components/Home/Logos';
import HomeInfoModal from '../../components/Home/HomeInfoModal';
import deepLinkService from '../../services/deep_link_service';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

let _this = null;

class Home extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      infoModalVisible: false,
      errorType: '',
      isLoading: false,
      scorecardUuid: '',
    }

    _this = this;
  };

  componentDidMount() {
    setTimeout(() => {
      deepLinkService.watchIncommingDeepLink(this.updateModalStatus, this.closeModal, this.handleOccupiedScorecard);
    }, 100)
  }

  updateModalStatus(isLoading, scorecardUuid, errorType) {
    _this.setState({
      infoModalVisible: true,
      errorType,
      isLoading,
      scorecardUuid,
    });
  }

  closeModal() {
    _this.setState({
      infoModalVisible: false,
      errorType: '',
      isLoading: false,
      scorecard: null,
    });
  }

  handleOccupiedScorecard(scorecard) {
    _this.props.setCurrentScorecard(scorecard);
    _this.closeModal();
    _this.props.navigation.reset({ index: 0, routes: [{ name: 'ScorecardProgress', params: { uuid: scorecard.uuid } }] });
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

        <HomeInfoModal
          visible={this.state.infoModalVisible}
          onDismiss={() => this.setState({ infoModalVisible: false })}
          errorType={this.state.errorType}
          isLoading={this.state.isLoading}
          scorecardUuid={this.state.scorecardUuid}
        />
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