import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../../components/Translations';
import NewScorecardForm from '../../components/NewScorecard/NewScorecardForm';
import NewScorecardModals from '../../components/NewScorecard/NewScorecardModals';

import Color from '../../themes/color';
import {checkConnection, getErrorType} from '../../services/api_service';
import Scorecard from '../../models/Scorecard';

import authenticationFormService from '../../services/authentication_form_service';
import internetConnectionService from '../../services/internet_connection_service';
import newScorecardService from '../../services/new_scorecard_service';
import { ERROR_INVALID_SCORECARD_URL } from '../../constants/error_constant';

import Brand from '../../components/Home/Brand';
import Logos from '../../components/Home/Logos';

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
    };

    this.unsubscribeNetInfo;
    this.scorecardRef = React.createRef();
    this.componentIsUnmount = false;
    _this = this;
  }

  componentDidMount() {
    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });
  }

  componentWillUnmount() {
    this.componentIsUnmount = true;
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

  joinScorecard = async (code) => {
    this.setState({ code });
    const isAuthenticated = await authenticationFormService.isAuthenticated();
    this.setState({ errorMsg: '' });

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
      (errorType) => this.handleErrorScorecard(errorType),
      () => this.handleJoinScorecardSuccess(),
      (error) => this.handleJoinScorecardError(error)
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

  handleErrorScorecard(errorType) {
    _this.setState({
      isLoading: false,
      visibleModal: true,
      errorType: errorType,
    });
  }

  handleJoinScorecardSuccess() {
    this.setState({isLoading: false});
    this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: this.state.code});
  }

  handleJoinScorecardError(error) {
    this.setState({isLoading: false});
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

  renderForm() {
    return (
      <NewScorecardForm
        scorecardRef={this.scorecardRef}
        errorMsg={this.state.errorMsg}
        messageType={this.state.messageType}
        joinScorecard={this.joinScorecard}
        navigation={this.props.navigation}
        handleInvalidUrl={this.handleErrorScorecard}
      />
    )
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

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={require('../../assets/images/home/bg.jpg')} style={styles.imageBg}>
          <View style={{alignItems: 'center', flex: 1}}>
            <Spinner
              visible={this.state.isLoading}
              color={Color.primaryColor}
              overlayColor={Color.loadingBackgroundColor}
            />

            <View style={{flex: 3}}></View>

            <Brand/>
            { this.renderForm() }
            <Logos />
            { this.renderModals() }
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  errorLabel: {
    color: Color.errorColor,
  },
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