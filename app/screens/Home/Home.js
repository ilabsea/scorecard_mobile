import React, {Component} from 'react';
import { StyleSheet, ImageBackground } from "react-native";

import HomeContent from '../../components/Home/HomeContent';
import HomeInfoMessageModal from '../../components/Home/HomeInfoMessageModal';
import ReLoginMessageModal from '../../components/ReLoginMessageModal/ReLoginMessageModal';
import deepLinkService from '../../services/deep_link_service';
import lockDeviceService from '../../services/lock_device_service';
import resetLockService from '../../services/reset_lock_service';
import reLoginService from '../../services/re_login_service';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';
import { INVALID_SCORECARD_ATTEMPT } from '../../constants/lock_device_constant';

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
  };

  async componentDidMount() {
    this.setState({ reLoginMessageModalVisible: await reLoginService.isRequireReLogin() })

    if (await lockDeviceService.hasFailAttempt(INVALID_SCORECARD_ATTEMPT) && !this.resetLockInterval)
      this.watchLockStatus();

    setTimeout(() => {
      deepLinkService.watchIncommingDeepLink(this.updateModalStatus, this.closeModal, this.handleOccupiedScorecard);
    }, 100)
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
      infoModalVisible: true,
      errorType,
      isLoading,
      scorecardUuid,
      unlockAt: await lockDeviceService.unlockAt(INVALID_SCORECARD_ATTEMPT),
    });
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