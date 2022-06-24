import React, {Component} from 'react';
import { StyleSheet, ImageBackground, BackHandler } from "react-native";

import HomeContent from '../../components/Home/HomeContent';
import HomeInfoMessageModal from '../../components/Home/HomeInfoMessageModal';
import ReLoginMessageModal from '../../components/Home/ReLoginMessageModal';
import deepLinkService from '../../services/deep_link_service';
import lockDeviceService from '../../services/lock_device_service';
import resetLockService from '../../services/reset_lock_service';
import reLoginService from '../../services/re_login_service';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import { INVALID_SCORECARD_ATTEMPT } from '../../constants/lock_device_constant';
import { ERROR_NOT_FOUND, ERROR_SCORECARD_NOT_EXIST } from '../../constants/error_constant';

let _this = null;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoModalVisible: false,
      errorType: '',
      isLoading: false,
      scorecardUuid: '',
      unlockAt: '',
      reLoginMessageModalVisible: false
    }

    _this = this;
    this.componentIsUnmount = false;
    this.lastPress = null;
  };

  async componentDidMount() {
    if (await lockDeviceService.hasFailAttempt(INVALID_SCORECARD_ATTEMPT) && !this.resetLockInterval)
      this.watchLockStatus();

    const routes = this.props.navigation.getState().routes;
    setTimeout(async () => {
      // Show the re-login alert message when there is only home screen on the navigation stack
      if (routes.length == 1 && routes[0].name.toLowerCase() == 'home')
        this.setState({ reLoginMessageModalVisible: await reLoginService.isRequireReLogin() })

      deepLinkService.watchIncommingDeepLink(this.updateModalStatus, this.closeModal, this.handleOccupiedScorecard);
    }, 100)

    BackHandler.addEventListener('hardwareBackPress', () => {
      // If the the user clicks on the android's back button on the other screens except the home screen,
      // it will redirect to the previous screen normally
      const navRoutes = _this.props.navigation.getState().routes;
      if (navRoutes[navRoutes.length - 1].name.toLowerCase() != 'home')
        return false;

      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 700;

      if (_this.lastPress && (now - _this.lastPress) < DOUBLE_PRESS_DELAY)
        return false;

      _this.lastPress = now;
      return true;
    });
  }

  componentWillUnmount() {
    this.componentIsUnmount = true;
    clearInterval(_this.resetLockInterval);
    _this.resetLockInterval = null;
  }

  async updateModalStatus(isLoading, scorecardUuid, errorType, isInvalidScorecard) {
    if (!_this.resetLockInterval && isInvalidScorecard && !_this.componentIsUnmount)
      _this.watchLockStatus();

    _this.setState({
      isLoading,
      scorecardUuid,
      unlockAt: await lockDeviceService.unlockAt(INVALID_SCORECARD_ATTEMPT),
    })

    if (errorType != null) {
      _this.setState({
        infoModalVisible: true,
        errorType: errorType === ERROR_NOT_FOUND ? ERROR_SCORECARD_NOT_EXIST : errorType,
      });
    }
  }

  watchLockStatus() {
    _this.resetLockInterval = resetLockService.watchLockStatus(INVALID_SCORECARD_ATTEMPT, async () => {
      clearInterval(_this.resetLockInterval);
      _this.resetLockInterval = null;
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
    return (
      <ImageBackground source={require('../../assets/images/home/bg.jpg')} style={styles.imageBg}>
        <HomeContent navigation={this.props.navigation} />

        <HomeInfoMessageModal
          visible={this.state.infoModalVisible}
          onDismiss={() => this.setState({ infoModalVisible: false })}
          errorType={this.state.errorType}
          isLoading={this.state.isLoading}
          scorecardUuid={this.state.scorecardUuid}
          unlockAt={this.state.unlockAt}
        />

        <ReLoginMessageModal
          visible={this.state.reLoginMessageModalVisible}
          onDismiss={() => this.setState({ reLoginMessageModalVisible: false })}
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