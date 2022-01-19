import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../../components/Translations';
import NewScorecardModals from '../../components/NewScorecard/NewScorecardModals';
import NewScorecardContent from '../../components/NewScorecard/NewScorecardContent';

import Scorecard from '../../models/Scorecard';
import {checkConnection, getErrorType} from '../../services/api_service';
import authenticationFormService from '../../services/authentication_form_service';
import internetConnectionService from '../../services/internet_connection_service';
import newScorecardService from '../../services/new_scorecard_service';
import lockDeviceService from '../../services/lock_device_service';
import resetLockService from '../../services/reset_lock_service';
import { ERROR_INVALID_SCORECARD_URL } from '../../constants/error_constant';
import { INVALID_SCORECARD_ATTEMPT } from '../../constants/lock_device_constant';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

let _this = null;
class NewScorecard extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.uuid = '';
    this.state = {
      code: '',
      errorMsg: '',
      messageType: '',
      isLoading: false,
      visibleModal: false,
      errorType: null,
      visibleInfoModal: false,
      isSubmitted: false,
      hasInternetConnection: false,
      isLocked: false,
      unlockAt: '',
    };

    this.unsubscribeNetInfo;
    this.scorecardRef = React.createRef();
    this.componentIsUnmount = false;
    _this = this;
  }

  async componentDidMount() {
    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });

    if (await lockDeviceService.hasFailAttempt(INVALID_SCORECARD_ATTEMPT) && !this.resetLockInterval) {
      this.setState({
        isLocked: await lockDeviceService.isLocked(INVALID_SCORECARD_ATTEMPT),
        unlockAt: await lockDeviceService.unlockAt(INVALID_SCORECARD_ATTEMPT)
      })
      this.watchLockStatus();
    }
  }

  componentWillUnmount() {
    clearInterval(this.resetLockInterval);
    this.componentIsUnmount = true;
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

   watchLockStatus() {
    this.resetLockInterval = resetLockService.watchLockStatus(INVALID_SCORECARD_ATTEMPT, async () => {
      clearInterval(this.resetLockInterval);
      this.resetLockInterval = null;

      this.setState({
        isLocked: false,
        errorMsg: '',
        unlockAt: '',
      });
    });
  }

  joinScorecard = async (code) => {
    this.setState({ code, errorMsg: '' });
    const isAuthenticated = await authenticationFormService.isAuthenticated();

    if (await lockDeviceService.isLocked(INVALID_SCORECARD_ATTEMPT))
      return;

    if (!isAuthenticated) {
      this.setErrorState('422');
      return;
    }

    const isSubmitted = Scorecard.isSubmitted(code);
    if (!newScorecardService.isValidScorecard(code) || isSubmitted) {
      this.setState({
        visibleInfoModal: isSubmitted,
        isSubmitted: isSubmitted,
      });

      return;
    }

    if (Scorecard.isExists(code)) {
      newScorecardService.handleExistedScorecard(code, () => {
        this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: code});
      }, () => {
        this.setState({
          visibleInfoModal: true,
          isSubmitted: false,
        });
      })
      return;
    }

    if (!this.state.hasInternetConnection) {
      internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection);
      return;
    }

    this.setState({isLoading: true});
    AsyncStorage.setItem('IS_CONNECTED', 'false');

    newScorecardService.joinScorecard(code,
      (errorType, isLocked, isInvalidScorecard) => this.handleErrorScorecard(errorType, isLocked, isInvalidScorecard),
      () => this.handleJoinScorecardSuccess(),
      (error, isLocked, isInvalidScorecard) => this.handleJoinScorecardError(error, isLocked, isInvalidScorecard)
    );

    checkConnection((type, message) => {
      if (!this.componentIsUnmount)
        this.setState({
          messageType: type,
          errorMsg: message,
          isLoading: false,
        });
    });
  };

  async handleErrorScorecard(errorType, isLocked = false, isInvalidScorecard = false) {
    if (!_this.resetLockInterval && isInvalidScorecard)
      _this.watchLockStatus();

    _this.setState({
      isLoading: false,
      visibleModal: true,
      errorType: errorType,
      isLocked: isLocked,
      unlockAt: await lockDeviceService.unlockAt(INVALID_SCORECARD_ATTEMPT) || '',
    });
  }

  handleJoinScorecardSuccess() {
    this.setState({isLoading: false});
    this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: this.state.code});
  }

  async handleJoinScorecardError(error, isLocked, isInvalidScorecard) {
    if (!this.resetLockInterval && isInvalidScorecard)
      this.watchLockStatus();

    const unlockAt = await lockDeviceService.unlockAt(INVALID_SCORECARD_ATTEMPT) || '';

    this.setState({
      isLoading: false,
      isLocked: isLocked,
      errorType: !!unlockAt ? 'error' : null,
      unlockAt: unlockAt,
    });
    this.setErrorState(error.status);
  }

  setErrorState = (error) => {
    this.setState({
      visibleModal: true,
      errorType: getErrorType(error),
    });
  }

  closeModal = (hasAutoFocus) => {
    this.setState({
      visibleModal: false,
      visibleInfoModal: false,
    });

    if (hasAutoFocus && this.state.errorType != ERROR_INVALID_SCORECARD_URL)
      !!this.scorecardRef.current.inputRef && this.scorecardRef.current.inputRef.focusField(5);
  }

  renderModals() {
    return (
      <NewScorecardModals
        visibleErrorModal={this.state.visibleModal}
        visibleInfoModal={this.state.visibleInfoModal}
        scorecardUuid={this.state.code}
        errorType={this.state.errorType}
        isSubmitted={this.state.isSubmitted}
        navigation={this.props.navigation}
        closeModal={this.closeModal}
        setCurrentScorecard={(scorecard) => this.props.setCurrentScorecard(scorecard)}
      />
    )
  }

  renderContent() {
    return <NewScorecardContent
              scorecardRef={this.scorecardRef}
              errorMsg={this.state.errorMsg}
              messageType={this.state.messageType}
              joinScorecard={this.joinScorecard}
              navigation={this.props.navigation}
              handleInvalidUrl={this.handleErrorScorecard}
              isLocked={this.state.isLocked}
              unlockAt={this.state.unlockAt}
              isLoading={this.state.isLoading}
          />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={require('../../assets/images/home/bg.jpg')} style={styles.imageBg}>
          <View style={{alignItems: 'center', flex: 1}}>
            { this.renderContent() }

            { this.renderModals() }
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

function mapDispatchToProps(dispatch) {
  return {
    setCurrentScorecard: (scorecard) => dispatch(set(scorecard)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(NewScorecard);