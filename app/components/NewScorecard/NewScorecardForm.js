import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from '../Translations';
import ButtonForgetCode from './ButtonForgetCode';
import ScorecardCodeInput from './ScorecardCodeInput';
import MessageLabel from '../MessageLabel';

import Color from '../../themes/color';
import { getDeviceStyle, isShortScreenDevice } from '../../utils/responsive_util';
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
        <MaterialIcon name="refresh" size={isShortScreenDevice() ? 17 : 20} color={ Color.whiteColor } style={{marginTop: 3}} />
      </TouchableOpacity>
    )
  }

  renderErrorMsg = () => {
    const { translations } = this.context;

    if (this.props.errorMsg != '') {
      return (
        <React.Fragment>
          <MessageLabel
            message={translations[this.props.errorMsg]}
            type={this.props.messageType}
            customStyle={[responsiveStyles.messageLabel, {marginTop: 10}]}
          />

          { this.renderRetryBtn() }
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
      <View style={responsiveStyles.formContainer}>
        <ScorecardCodeInput
          ref={this.props.scorecardRef}
          joinScorecard={this.joinScorecard}
        />

        {this.renderErrorMsg()}

        <ButtonForgetCode navigation={this.props.navigation} />
      </View>
    )
  }
}

export default NewScorecardForm;