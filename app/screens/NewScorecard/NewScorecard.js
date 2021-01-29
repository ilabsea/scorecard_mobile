import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TextInput as NativeTextInput,
  TouchableOpacity,
} from 'react-native';
import Loading from 'react-native-whc-loading';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import TextFieldInput from '../../components/TextFieldInput';
import MessageLabel from '../../components/MessageLabel';
import ErrorMessageModal from '../../components/ErrorMessageModal/ErrorMessageModal';
import Color from '../../themes/color';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import validationService from '../../services/validation_service';
import {checkConnection, handleApiResponse, getErrorType} from '../../services/api_service';
import scorecardService from '../../services/scorecardService';
import authenticationService from '../../services/authentication_service';
import { Icon } from 'native-base';

import Brand from '../../components/Home/Brand';
import Logos from '../../components/Home/Logos';
import ScorecardApi from '../../api/ScorecardApi';

import { ERROR_SCORECARD } from '../../constants/error_constant';

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
    };
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
    const isErrorAuthentication = await authenticationService.isErrorAuthentication();
    if (isErrorAuthentication) {
      this.setErrorState('422');
      return;
    }

    if (!this.isValid())
      return;

    if (scorecardService.isExists(this.state.code)) {
      AsyncStorage.setItem('SELECTED_SCORECARD_UUID', this.state.code);
      this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: this.state.code});
      return;
    }

    const {code} = this.state;
    this.setState({isLoading: true});
    this.refs.loading.show();
    AsyncStorage.setItem('IS_CONNECTED', 'false');

    const scorecardApi = new ScorecardApi();
    const response = await scorecardApi.load(code);
    handleApiResponse(response, (responseData) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      this.setState({isLoading: false});
      this.refs.loading.show(false);
      if (responseData === null) {
        this.setState({
          codeMsg: 'scorecardIsNotExist',
          visibleModal: true,
          errorType: ERROR_SCORECARD,
        });
      }
      else {
        this.uuid = responseData.uuid;
        scorecardService.saveScorecardDetail(responseData);
        this.props.navigation.navigate('ScorecardDetail', {scorecard_uuid: this.uuid});
      }
    }, (error) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      this.setState({isLoading: false});
      this.setErrorState(error);
      this.refs.loading.show(false);
    });

    checkConnection((type, message) => {
      this.setState({
        messageType: type,
        errorMsg: message,
        isLoading: false,
      });
      this.refs.loading.show(false);
    });
  };

  setErrorState = (error) => {
    this.setState({
      visibleModal: true,
      errorType: getErrorType(error),
    });
  }

  onChangeText = (type, value) => {
    this.setState({code: value});
  };

  renderErrorMsg = () => {
    const {errorMsg, messageType} = this.state;

    if (errorMsg != '') {
      return (
        <MessageLabel
          message={errorMsg}
          type={messageType}
          customStyle={{marginTop: 10}}
        />
      );
    }
  };

  renderBtnContact() {
    const { translations } = this.context;

    return (
      <View style={{ alignItems: 'center', marginTop: 30}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Contact')}
          style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>

          <Text style={{color: '#fff'}}>{translations.clickHereIfForgetCode}</Text>
          <Icon name={'chevron-forward'} style={{color: '#fff', fontSize: 24}}/>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { translations } = this.context;
    const {code, codeMsg} = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={require('../../assets/images/home/bg.jpg')} style={styles.imageBg}>
          <View style={{alignItems: 'center', flex: 1}}>
            <Loading
              ref="loading"
              backgroundColor="#ffffffF2"
              borderRadius={5}
              size={70}
              imageSize={40}
              indicatorColor={Color.primaryColor}
            />

            <View style={{flex: 3}}></View>

            <Brand/>

            <View style={{width: '65%', maxWidth: 360, marginTop: 20}}>
              <TextFieldInput
                value={code}
                label={translations["enterScorecardCode"]}
                placeholder={translations["enterScorecardCode"]}
                fieldName="scorecardCode"
                onChangeText={this.onChangeText}
                message={translations[codeMsg]}
                maxLength={6}
                keyboardType="number-pad"
                customStyle={{fontSize: 22, height: 64}}
                leftIcon="lock"
                customIconStyle={{marginTop: 10}}
                render={(innerProps) => (
                  <NativeTextInput
                    {...innerProps}
                    style={{height: 64, paddingLeft: 40, fontSize: 20, fontFamily: FontFamily.body}}
                  />
                )}
                customMessageStyle={{marginBottom: 0, color: '#03314a'}}
                borderColor="#03314a"
              />
              {this.renderErrorMsg()}

              <ActionButton
                onPress={() => this.joinScorecard()}
                label={translations["join"]}
                customButtonStyle={{marginTop: 16, height: 64}}
                customLabelStyle={{fontSize: 20}}
                isDisabled={this.state.isLoading}
              />

              { this.renderBtnContact() }
            </View>

            <Logos />

            <ErrorMessageModal
              visible={this.state.visibleModal}
              onDismiss={() => this.setState({visibleModal: false})}
              errorType={this.state.errorType}
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

export default NewScorecard;
