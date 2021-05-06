import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TextInput as NativeTextInput,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import TextFieldInput from '../../components/TextFieldInput';
import MessageLabel from '../../components/MessageLabel';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';
import ScorecardInfoModal from '../../components/NewScorecard/ScorecardInfoModal';
import ButtonForgetCode from '../../components/NewScorecard/ButtonForgetCode';

import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import validationService from '../../services/validation_service';
import {checkConnection, getErrorType} from '../../services/api_service';
import Scorecard from '../../models/Scorecard';

import { isDownloaded } from '../../services/scorecard_download_service';
import authenticationFormService from '../../services/authentication_form_service';
import internetConnectionService from '../../services/internet_connection_service';
import ScorecardService from '../../services/scorecardService';
import { load as loadProgramLanguage } from '../../services/program_language_service';

import Brand from '../../components/Home/Brand';
import Logos from '../../components/Home/Logos';

import { ERROR_SCORECARD } from '../../constants/error_constant';

import { connect } from 'react-redux';
import { set } from '../../actions/currentScorecardAction';

import { getDeviceStyle } from '../../utils/responsive_util';
import NewScorecardTabletStyles from '../../styles/tablet/NewScorecardScreenStyle';
import NewScorecardMobileStyles from '../../styles/mobile/NewScorecardScreenStyle';

const responsiveStyles = getDeviceStyle(NewScorecardTabletStyles, NewScorecardMobileStyles);

class NewScorecard extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.uuid = '';
    this.state = {
      code: '',
      codeMsg: '',
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
  }

  componentDidMount() {
    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      this.setState({ hasInternetConnection: hasConnection });
    });
  }

  componentWillUnmount() {
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

  isValid = () => {
    this.setState({
      codeMsg: '',
      errorMsg: '',
    });
    const {code} = this.state;
    const codeValidationMsg = validationService('scorecardCode', code);

    this.setState({codeMsg: codeValidationMsg || ''});
    if (codeValidationMsg != null) return false;

    return true;
  };

  joinScorecard = async () => {
    const isAuthenticated = await authenticationFormService.isAuthenticated();

    if (!isAuthenticated) {
      this.setErrorState('422');
      return;
    }

    const isSubmitted = Scorecard.isSubmitted(this.state.code);
    if (!this.isValid() || isSubmitted) {
      this.setState({
        visibleInfoModal: isSubmitted,
        isSubmitted: isSubmitted,
      });

      return;
    }

    if (Scorecard.isExists(this.state.code)) {
      AsyncStorage.setItem('SELECTED_SCORECARD_UUID', this.state.code);

      if (!isDownloaded(this.state.code)) {
        this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: this.state.code});
        return;
      }

      this.setState({
        visibleInfoModal: true,
        isSubmitted: false,
      });

      return;
    }

    if (!this.state.hasInternetConnection) {
      const { translations } = this.context;
      internetConnectionService.showAlertMessage(translations.noInternetConnection);
      return;
    }

    const {code} = this.state;
    this.setState({isLoading: true});
    AsyncStorage.setItem('IS_CONNECTED', 'false');

    const scorecardService = new ScorecardService();
    scorecardService.find(code, (responseData) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      if (responseData === null) {
        this.setState({isLoading: false});
        this.setState({
          codeMsg: 'scorecardIsNotExist',
          visibleModal: true,
          errorType: ERROR_SCORECARD,
        });
      }
      else {
        this.uuid = responseData.uuid;
        Scorecard.upsert(responseData);

        loadProgramLanguage(responseData.program_id, (response) => {
          this.setState({isLoading: false});
          this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: this.uuid});
        });
      }
    }, (error) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      this.setState({isLoading: false});
      this.setErrorState(error.status);
    });

    checkConnection((type, message) => {
      this.setState({
        messageType: type,
        errorMsg: message,
        isLoading: false,
      });
    });
  };

  setErrorState = (error) => {
    this.setState({
      visibleModal: true,
      errorType: getErrorType(error),
    });
  }

  onChangeText = (type, value) => {
    this.setState({
      code: value,
      codeMsg: '',
    });
  };

  renderErrorMsg = () => {
    const {errorMsg, messageType} = this.state;
    const { translations } = this.context;

    if (errorMsg != '') {
      return (
        <MessageLabel
          message={translations[errorMsg]}
          type={messageType}
          customStyle={{marginTop: 10}}
        />
      );
    }
  };

  isDisabled = () => {
    const codeValidationMsg = validationService('scorecardCode', this.state.code);

    if (codeValidationMsg != null || this.state.isLoading || this.state.code === '')
      return true;

    return false;
  }

  render() {
    const { translations } = this.context;
    const {code, codeMsg} = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={require('../../assets/images/home/bg.jpg')} style={styles.imageBg}>
          <View style={{alignItems: 'center', flex: 1}}>
            <Spinner
              visible={this.state.isLoading}
              color={Color.primaryColor}
              overlayColor='rgba(90, 90, 90, 0.55)'
            />

            <View style={{flex: 3}}></View>

            <Brand/>

            <View style={responsiveStyles.formContainer}>
              <TextFieldInput
                value={code}
                label={translations["enterScorecardCode"]}
                placeholder={translations["enterScorecardCode"]}
                fieldName="scorecardCode"
                onChangeText={this.onChangeText}
                message={translations[codeMsg]}
                maxLength={6}
                keyboardType="number-pad"
                customStyle={responsiveStyles.inputContainer}
                leftIcon="lock"
                customIconStyle={{marginTop: 10}}
                render={(innerProps) => (
                  <NativeTextInput
                    {...innerProps}
                    style={responsiveStyles.textInput}
                  />
                )}
                borderColor={Color.primaryColor}
                hideMessage={true}
              />
              {this.renderErrorMsg()}

              <ActionButton
                onPress={() => this.joinScorecard()}
                label={translations["join"]}
                customButtonStyle={responsiveStyles.button}
                customLabelStyle={responsiveStyles.buttonLabel}
                isDisabled={this.isDisabled()}
              />

              <ButtonForgetCode navigation={this.props.navigation} />
            </View>

            <Logos />

            <ErrorMessageModal
              visible={this.state.visibleModal}
              onDismiss={() => this.setState({visibleModal: false})}
              errorType={this.state.errorType}
              isNewScorecard={true}
            />

            <ScorecardInfoModal
              visible={this.state.visibleInfoModal}
              navigation={this.props.navigation}
              onDismiss={() => this.setState({ visibleInfoModal: false })}
              isSubmitted={this.state.isSubmitted}
              scorecardUuid={this.state.code}
              setCurrentScorecard={(scorecard) => this.props.setCurrentScorecard(scorecard)}
            />
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
