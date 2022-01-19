import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from '../Translations';
import ButtonForgetCode from './ButtonForgetCode';
import ScorecardCodeInput from './ScorecardCodeInput';
import MessageLabel from '../MessageLabel';

import Color from '../../themes/color';
import { getDeviceStyle, isShortWidthScreen } from '../../utils/responsive_util';
import NewScorecardTabletStyles from '../../styles/tablet/NewScorecardScreenStyle';
import NewScorecardMobileStyles from '../../styles/mobile/NewScorecardScreenStyle';

const responsiveStyles = getDeviceStyle(NewScorecardTabletStyles, NewScorecardMobileStyles);

let _this = null;
class NewScorecardForm extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.code = '';
    _this = this;
  }

  renderRetryBtn() {
    return (
      <TouchableOpacity onPress={() => this.props.joinScorecard(this.code)}
        style={responsiveStyles.retryLink}
      >
        <Text style={[responsiveStyles.rejoinLink, responsiveStyles.messageLabel]}>{ this.context.translations.rejoinScorecard }</Text>
        <MaterialIcon name="refresh" size={getDeviceStyle(18, 17)} color={ Color.whiteColor } style={{marginTop: isShortWidthScreen() ? 2 : 3}} />
      </TouchableOpacity>
    )
  }

  renderErrorMsg = () => {
    const { translations } = this.context;

    if (this.props.errorMsg != '' || !!this.props.isLocked) {
      const message = !!this.props.unlockAt ? translations.formatString(translations.yourDeviceIsCurrentlyLocked, this.props.unlockAt) : translations[this.props.errorMsg];

      return (
        <React.Fragment>
          <MessageLabel
            message={message}
            type={this.props.messageType}
            customStyle={[responsiveStyles.errorMessageLabel, {marginTop: 10}]}
          />

          { !this.props.isLocked && this.renderRetryBtn() }
        </React.Fragment>
      );
    }
  }

  joinScorecard(code) {
    _this.code = code;
    _this.props.joinScorecard(code);
  }

  render() {
    return (
      <View style={[responsiveStyles.formContainer, this.props.errorMsg != '' ? { marginBottom: getDeviceStyle(-30, 0) } : {}]}>
        <ScorecardCodeInput
          ref={this.props.scorecardRef}
          joinScorecard={this.joinScorecard}
          handleInvalidUrl={this.props.handleInvalidUrl}
          isLocked={this.props.isLocked}
        />

        {this.renderErrorMsg()}

        <ButtonForgetCode navigation={this.props.navigation} hasErrorMsg={this.props.errorMsg != '' ? true : false} />
      </View>
    )
  }
}

export default NewScorecardForm;