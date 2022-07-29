import React, {Component} from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../Translations';
import NewScorecardForm from './NewScorecardForm';
import Color from '../../themes/color';
import Brand from '../Home/Brand';
import Logos from '../Home/Logos';

import internetConnectionService from '../../services/internet_connection_service';
import scorecardValidationService from '../../services/scorecard_validation_service';

let _this = null;

class NewScorecardMain extends Component {
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

    if (!_this.state.hasInternetConnection) {
      _this.props.setErrorState('511')
      return;
    }

    const isAbleToJoinNewScorecard = await scorecardValidationService.validateScorecardCode(code, (errorStatus) => {
      _this.props.setErrorState(errorStatus);
    }, (visible, isSubmitted, hasMatchedEndpoint) => {
      _this.props.updateInfoModalState(visible, isSubmitted, hasMatchedEndpoint);
    });

    if (!isAbleToJoinNewScorecard)
      return;

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
        handleInvalidUrl={this.props.handleInvalidUrl}
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

export default NewScorecardMain;