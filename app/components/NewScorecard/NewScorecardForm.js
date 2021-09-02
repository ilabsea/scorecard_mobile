import React, { Component } from 'react';
import { View } from 'react-native';

import {LocalizationContext} from '../Translations';
import ButtonForgetCode from './ButtonForgetCode';
import ScorecardCodeInput from './ScorecardCodeInput';
import MessageLabel from '../MessageLabel';

import { getDeviceStyle } from '../../utils/responsive_util';
import NewScorecardTabletStyles from '../../styles/tablet/NewScorecardScreenStyle';
import NewScorecardMobileStyles from '../../styles/mobile/NewScorecardScreenStyle';

const responsiveStyles = getDeviceStyle(NewScorecardTabletStyles, NewScorecardMobileStyles);

class NewScorecardForm extends Component {
  static contextType = LocalizationContext;

  renderErrorMsg = () => {
    const { translations } = this.context;

    if (this.props.errorMsg != '') {
      return (
        <MessageLabel
          message={translations[this.props.errorMsg]}
          type={this.props.messageType}
          customStyle={{marginTop: 10}}
        />
      );
    }
  }

  render() {
    return (
      <View style={responsiveStyles.formContainer}>
        <ScorecardCodeInput
          ref={this.props.scorecardRef}
          joinScorecard={this.props.joinScorecard}
        />

        {this.renderErrorMsg()}
        <ButtonForgetCode navigation={this.props.navigation} />
      </View>
    )
  }
}

export default NewScorecardForm;