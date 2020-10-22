import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Loading from 'react-native-whc-loading';
import AsyncStorage from '@react-native-community/async-storage';

import {LocalizationContext} from '../../components/Translations';
import ActionButton from '../../components/ActionButton';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';

import {connect} from 'react-redux';
import {getScorecardDetailAction} from '../../actions/scorecardAction';

class NewScorecard extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      codeMsg: '',
      isLoading: false,
    };
  }

  renderCodeMsg = () => {
    const {translations} = this.context;
    const {codeMsg} = this.state;

    return (
      <Text style={styles.errorLabel}>
        {translations[codeMsg]}
      </Text>
    );
  }

  isValid = () => {
    this.setState({
      codeMsg: '',
      errorMsg: '',
    });

    const {code} = this.state;
    let isError = false;
    let isnum = /^\d+$/.test(code);

    if (code === '' || code === null || code === undefined) {
      isError = true;
      this.setState({codeMsg: 'scorecardCodeRequireMsg'});
    }
    else if (!isnum) {
      isError = true;
      this.setState({codeMsg: 'scorecardCodeNumberOnlyMsg'});
    }
    else if (code.length < 6 || code.length > 6) {
      isError = true;
      this.setState({codeMsg: 'scorecardCodeDigitMsg'});
    }

    if (isError)
      return false;

    return true;
  }

  joinScorecard = async () => {
    if (!this.isValid())
      return;

    const _this = this;
    let hasConnection = false;
    const {code} = this.state;
    this.setState({isLoading: true});
    this.refs.loading.show();

    this.props.getScorecardDetailAction(code, async (isSuccess, response) => {
      hasConnection = true;
      if (isSuccess) {
        this.setState({isLoading: false});
        this.refs.loading.show(false);
        if (response === null) {
          this.setState({codeMsg: 'scorecardIsNotExist'});
        }
        else {
          AsyncStorage.setItem('SCORECARD_DETAIL', JSON.stringify(response));
        }
      }
      else {
        this.setState({isLoading: false});
        this.refs.loading.show(false);
      }
    });

    setTimeout(function () {
      _this.refs.loading.show(false);
      _this.setState({isLoading: false});
      if (!hasConnection) {
        _this.setState({codeMsg: 'lowInternetConnectionMsg'});
      }
    }, 5000);
  }

  render() {
    const {translations} = this.context;
    const {code} = this.state;

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

          <TextInput
            value={code}
            placeholder={translations['enterScorecardCode']}
            clearButtonMode="while-editing"
            keyboardType="number-pad"
            style={CustomStyle.textInputContainer}
            onChangeText={(text) => this.setState({code: text})}
          />
          {this.renderCodeMsg()}
          <ActionButton
            onPress={() => this.joinScorecard()}
            title="join"
            containerStyle={{marginTop: 16, width: '100%'}}
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
    alignItems: 'center',
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