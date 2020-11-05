import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Loading from 'react-native-whc-loading';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import TextFieldInput from '../../components/TextFieldInput';
import MessageLabel from '../../components/MessageLabel';
import Color from '../../themes/color';
import validationService from '../../services/validation_service';
import {checkConnection} from '../../services/api_connectivity_service';

import {connect} from 'react-redux';
import {getScorecardDetailAction} from '../../actions/scorecardAction';

class NewScorecard extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      codeMsg: '',
      errorMsg: '',
      messageType: '',
      isLoading: false,
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
    if (!this.isValid()) return;

    const {code} = this.state;
    this.setState({isLoading: true});
    this.refs.loading.show();
    AsyncStorage.setItem('IS_CONNECTED', 'false');

    this.props.getScorecardDetailAction(code, async (isSuccess, response) => {
      AsyncStorage.setItem('IS_CONNECTED', 'true');
      if (isSuccess) {
        this.setState({isLoading: false});
        this.refs.loading.show(false);
        if (response === null) {
          this.setState({codeMsg: 'scorecardIsNotExist'});
        } else {
          AsyncStorage.setItem('SCORECARD_DETAIL', JSON.stringify(response));
          this.props.navigation.navigate('ScorecardDetail');
        }
      } else {
        this.setState({isLoading: false});
        this.refs.loading.show(false);
      }
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

  onChangeText = (type, value) => {
    this.setState({code: value});
  };

  renderErrorMsg = () => {
    const {errorMsg, messageType} = this.state;

    return (
      <MessageLabel
        message={errorMsg}
        type={messageType}
        customStyle={{marginTop: 10}}
      />
    );
  };

  render() {
    const {translations} = this.context;
    const {code, codeMsg} = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Loading
            ref="loading"
            backgroundColor="#ffffffF2"
            borderRadius={5}
            size={70}
            imageSize={40}
            indicatorColor={Color.primaryColor}
          />

          <TextFieldInput
            value={code}
            label={translations["scorecardCode"]}
            placeholder={translations["enterScorecardCode"]}
            fieldName="scorecardCode"
            onChangeText={this.onChangeText}
            message={translations[codeMsg]}
            isSecureEntry={false}
          />

          {this.renderErrorMsg()}

          <ActionButton
            onPress={() => this.joinScorecard()}
            label={translations["join"]}
            customButtonStyle={{marginTop: 16}}
            isDisabled={this.state.isLoading}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  errorLabel: {
    color: Color.errorColor,
  },
});

function mapStateToProps(state) {
  return {
    isLoading: state.getScorecardDetailReducer.isLoading,
    error: state.getScorecardDetailReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getScorecardDetailAction: (code, callback) => dispatch(getScorecardDetailAction(code, callback)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewScorecard);