import React, {Component} from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../Translations';
import NewScorecardForm from './NewScorecardForm';
import Color from '../../themes/color';
import Brand from '../Home/Brand';
import Logos from '../Home/Logos';

import Scorecard from '../../models/Scorecard';
import newScorecardService from '../../services/new_scorecard_service';
import authenticationFormService from '../../services/authentication_form_service';
import internetConnectionService from '../../services/internet_connection_service';
import lockDeviceService from '../../services/lock_device_service';
import resetLockService from '../../services/reset_lock_service';
import { INVALID_SCORECARD_ATTEMPT } from '../../constants/lock_device_constant';

let _this = null;

class NewScorecardContent extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      hasInternetConnection: false,
    }
    _this = this;
  }

  componentDidMount() {
    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });
  }

  componentWillUnmount() {
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

  async joinScorecard(code) {
    _this.props.updateScorecardCode(code);

    const isAuthenticated = await authenticationFormService.isAuthenticated();

    if (await lockDeviceService.isLocked(INVALID_SCORECARD_ATTEMPT))
      return;

    if (!isAuthenticated) {
      _this.props.setErrorState('422');
      return;
    }

    const isSubmitted = Scorecard.isSubmitted(code);
    if (!newScorecardService.isValidScorecard(code) || isSubmitted) {
      if (isSubmitted)
        resetLockService.resetLockData(INVALID_SCORECARD_ATTEMPT);

      _this.props.updateInfoModalState(isSubmitted, isSubmitted);
      return;
    }

    if (Scorecard.isExists(code)) {
      resetLockService.resetLockData(INVALID_SCORECARD_ATTEMPT);
      newScorecardService.handleExistedScorecard(code, () => {
        _this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: code});
      }, () => {
        _this.props.updateInfoModalState(true, false);
      })
      return;
    }

    if (!_this.state.hasInternetConnection) {
      internetConnectionService.showAlertMessage(_this.context.translations.noInternetConnection);
      return;
    }

    AsyncStorage.setItem('IS_CONNECTED', 'false');
    _this.props.joinScorecard(code);
  }

  renderForm() {
    return (
      <NewScorecardForm
        scorecardRef={this.props.scorecardRef}
        errorMsg={this.props.errorMsg}
        messageType={this.props.messageType}
        joinScorecard={this.joinScorecard}
        navigation={this.props.navigation}
        handleInvalidUrl={this.props.handleErrorScorecard}
        isLocked={this.props.isLocked}
        unlockAt={this.props.unlockAt}
      />
    )
  }

  render() {
    return (
      <React.Fragment>
        <Spinner
          visible={this.props.isLoading}
          color={Color.primaryColor}
          overlayColor={Color.loadingBackgroundColor}
        />

        <View style={{flex: 3}}></View>

        <Brand/>
        { this.renderForm() }
        <Logos />
      </React.Fragment>
    )
  }
}

export default NewScorecardContent;