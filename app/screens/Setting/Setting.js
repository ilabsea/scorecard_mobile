import React, {Component, useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from 'react-native-whc-loading';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';
import Color from '../../themes/color';

import {connect} from 'react-redux';
import {authenticateAction} from '../../actions/sessionAction';

class Setting extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      backendUrl: '',
      email: '',
      password: '',
      languages: [],
      language: 'km',
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
      errorMsg: '',
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const {appLanguage} = this.context;
    const langs = this.getData();

    this.setState({
      languages: this.getPickerFormat(langs),
      language: appLanguage,
    });
  }

  getData = () => {
    const {translations} = this.context;

    let data = translations.getAvailableLanguages();
    return data;
  };

  getPickerFormat = (items) => {
    let data = [];
    items.map((item) => {
      let itemObj = {value: item};
      if (item === 'km')
        itemObj['label'] = 'ខ្មែរ';
      else if (item === 'en')
        itemObj['label'] = 'English';

      data.push(itemObj);
    });

    return data;
  }

  renderFieldErrorMsg = (message) => {
    const {translations} = this.context;

    return (
      <Text style={{color: Color.errorColor, marginBottom: 10}}>
        {translations[message]}
      </Text>
    )
  }

  renderInputForm = () => {
    const {translations} = this.context;
    const {backendUrl, email, password, backendUrlErrorMsg, emailErrorMsg, passwordErrorMsg} = this.state;

    return (
      <View>
        <Text style={styles.inputLabel}>{translations['backendUrl']}</Text>
        <TextInput
          value={backendUrl}
          placeholder={translations['enterBackendUrl']}
          clearButtonMode="while-editing"
          style={styles.textInputContainer}
          onChangeText={(text) => this.setState({backendUrl: text})}
        />
        {this.renderFieldErrorMsg(backendUrlErrorMsg)}

        <Text style={styles.inputLabel}>{translations['email']}</Text>
        <TextInput
          value={email}
          placeholder={translations['enterEmail']}
          clearButtonMode="while-editing"
          style={styles.textInputContainer}
          onChangeText={(text) => this.setState({email: text})}
        />
        {this.renderFieldErrorMsg(emailErrorMsg)}

        <Text style={styles.inputLabel}>{translations['password']}</Text>
        <TextInput
          value={password}
          placeholder={translations['enterPassword']}
          clearButtonMode="while-editing"
          style={styles.textInputContainer}
          onChangeText={(text) => this.setState({password: text})}
        />
        {this.renderFieldErrorMsg(passwordErrorMsg)}
      </View>
    );
  };

  getPickerDefaultValue = (value) => {
    if (value != '' && value != undefined)
      return value.toString();

    return null;
  };

  changeLanugage = (item) => {
    const {setAppLanguage} = this.context;
    this.setState({language: item.value});
    setAppLanguage(item.value);
  } 

  renderChooseLanugage = () => {
    const {languages, language} = this.state;
    const {translations} = this.context;

    return (
      <View>
        <Text>{translations['language']}</Text>
        <DropDownPicker
          items={languages}
          defaultValue={
            languages.length > 1 ? this.getPickerDefaultValue(language) : null
          }
          placeholder={translations['selectLanguage']}
          searchablePlaceholder={translations['searchForLanguage']}
          zIndex={6000}
          searchable={true}
          containerStyle={{height: 50, marginTop: 10}}
          style={styles.dropDownPickerStyle}
          itemStyle={{justifyContent: 'flex-start'}}
          dropDownMaxHeight={200}
          dropDownStyle={{backgroundColor: 'white', opacity: 100}}
          onChangeItem={(item) => this.changeLanugage(item)}
        />
      </View>
    );
  };

  isValidForm = () => {
    const {backendUrl, email, password} = this.state;
    let isError = false;
    this.setState({
      errorMsg: '',
      backendUrlErrorMsg: '',
      emailErrorMsg: '',
      passwordErrorMsg: '',
    });

    if (backendUrl === '' || backendUrl === null || backendUrl === undefined) {
      isError = true;
      this.setState({backendUrlErrorMsg: 'backendUrlRequireMsg'});
    }
    if (email === '' || email === null || email === undefined) {
      isError = true;
      this.setState({emailErrorMsg: 'emailRequireMsg'});
    }
    if (password === '' || password === null || password === undefined) {
      isError = true;
      this.setState({passwordErrorMsg: 'passwordRequireMsg'});
    }

    if (isError)
      return false;

    return true;
  }

  save = async () => {
    if (!this.isValidForm())
      return;

    const _this = this;
    let hasConnection = false;
    const {backendUrl, email, password} = this.state;
    const authObj = {
      backendUrl: backendUrl,
      email: email,
      password: password,
    };
    AsyncStorage.setItem('AUTHENTICATION_ITEMS', authObj);

    this.refs.loading.show();
    this.setState({isLoading: true});

    this.props.authenticateAction(backendUrl, email, password, async (isSuccess, response) => {
      hasconnection = true;
      if (isSuccess) {
        this.refs.loading.show(false);
        this.setState({isLoading: false});
        AsyncStorage.setItem('AUTH_TOKEN', response['authentication_token']);
      }
      else {
        this.refs.loading.show(false);
        this.setState({isLoading: false});
        this.handleAuthenticateError(response);
      }
    });

    setTimeout(function() {
      _this.refs.loading.show(false);
      _this.setState({isLoading: false});
      if (!hasConnection) {
        _this.setState({errorMsg: 'lowInternetConnectionMsg'});
      }
    }, 20000);
  }

  handleAuthenticateError = (response) => {
    let message = '';
    if (response.error === undefined) {
      this.setState({errorMsg: 'authenticationFailed'});
      return;
    }

    const error = response.error;

    if (error.toLowerCase() === 'invalid email or password!')
      message = 'invalidEmailOrPasswordMsg';
    else if (error.toLowerCase() === 'Your account is unprocessable')
      message = 'accountIsUnprocessable';

    this.setState({errorMsg: message});
  }

  renderErrorMsg = () => {
    const {translations} = this.context;
    const {errorMsg} = this.state;

    return (
      <Text style={{color: Color.errorColor, marginTop: 30, textAlign: 'center'}}>
        {translations[errorMsg]}
      </Text>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container]}>
          <Loading
            ref="loading"
            backgroundColor='#ffffffF2'
            borderRadius={5}
            size={70}
            imageSize={40}
            indicatorColor={Color.primaryColor}
          />
          {this.renderInputForm()}
          {this.renderChooseLanugage()}
          {this.renderErrorMsg()}
          <ActionButton
            title='save'
            onPress={() => this.save()}
            containerStyle={{alignSelf: 'center', marginTop: 16, width: '100%'}}
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
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
  },
  inputLabel: {
    marginBottom: 10,
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    marginBottom: 6,
    backgroundColor: 'white',
  },
  dropDownPickerStyle: {
    backgroundColor: 'white',
    zIndex: 5000,
    elevation: 1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  }
});

function mapStateToProps(state) {
  return {
    isLoading: state.authenticateReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateAction: (backendUrl, email, password, callback) =>
      dispatch(authenticateAction(backendUrl, email, password, callback)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);