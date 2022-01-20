import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';

import {LocalizationContext} from '../../components/Translations';
import NewScorecardModals from '../../components/NewScorecard/NewScorecardModals';
import NewScorecardContent from '../../components/NewScorecard/NewScorecardContent';

import {checkConnection, getErrorType} from '../../services/api_service';
import newScorecardService from '../../services/new_scorecard_service';
import lockDeviceService from '../../services/lock_device_service';
import resetLockService from '../../services/reset_lock_service';
import { ERROR_INVALID_SCORECARD_URL } from '../../constants/error_constant';
import { INVALID_SCORECARD_ATTEMPT } from '../../constants/lock_device_constant';

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
      isLocked: false,
      unlockAt: '',
    };

    this.unsubscribeNetInfo;
    this.scorecardRef = React.createRef();
    this.componentIsUnmount = false;
    _this = this;
  }

  async componentDidMount() {
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

  joinScorecard = (code) => {
    _this.setState({isLoading: true});

    newScorecardService.joinScorecard(code,
      (errorType, isLocked, isInvalidScorecard) => _this.handleErrorScorecard(errorType, isLocked, isInvalidScorecard),
      () => _this.handleJoinScorecardSuccess(),
      (error, isLocked, isInvalidScorecard) => _this.handleJoinScorecardError(error, isLocked, isInvalidScorecard)
    );

    checkConnection((type, message) => {
      if (!_this.componentIsUnmount)
        _this.setState({
          messageType: type,
          errorMsg: message,
          isLoading: false,
        });
    });
  }

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
    _this.setState({isLoading: false});
    _this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: _this.state.code});
  }

  async handleJoinScorecardError(error, isLocked, isInvalidScorecard) {
    if (!_this.resetLockInterval && isInvalidScorecard)
      _this.watchLockStatus();

    const unlockAt = await lockDeviceService.unlockAt(INVALID_SCORECARD_ATTEMPT) || '';

    _this.setState({
      isLoading: false,
      isLocked: isLocked,
      errorType: !!unlockAt ? 'error' : null,
      unlockAt: unlockAt,
    });
    _this.setErrorState(error.status);
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
      />
    )
  }

  renderContent() {
    return <NewScorecardContent
              scorecardRef={this.scorecardRef}
              errorMsg={this.state.errorMsg}
              messageType={this.state.messageType}
              updateScorecardCode={(code) => _this.setState({ code })}
              joinScorecard={this.joinScorecard}
              navigation={this.props.navigation}
              handleInvalidUrl={this.handleErrorScorecard}
              isLocked={this.state.isLocked}
              unlockAt={this.state.unlockAt}
              isLoading={this.state.isLoading}
              updateInfoModalState={this.updateInfoModalState}
              setErrorState={this.setErrorState}
          />
  }

  updateInfoModalState(visible, isSubmitted) {
    _this.setState({
      visibleInfoModal: visible,
      isSubmitted
    })
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

export default NewScorecard;