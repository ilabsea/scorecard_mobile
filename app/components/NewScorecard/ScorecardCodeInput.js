import React, { Component } from 'react';
import { View, Text, AppState } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Clipboard from '@react-native-clipboard/clipboard';

import { LocalizationContext } from '../Translations';

import Color from '../../themes/color';
import { handleScorecardCodeClipboard } from '../../utils/scorecard_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardCodeInputTabletStyles from '../../styles/tablet/ScorecardCodeInputComponentStyle';
import ScorecardCodeInputMobileStyles from '../../styles/mobile/ScorecardCodeInputComponentStyle';

const styles = getDeviceStyle(ScorecardCodeInputTabletStyles, ScorecardCodeInputMobileStyles);

let _this = null;

class ScorecardCodeInput extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    _this = this;
  }

  componentDidMount() {
    handleScorecardCodeClipboard(_this.props.handleInvalidUrl);
    AppState.addEventListener('change', this._handleAppStateChange);
    setTimeout(() => {
      !!this.inputRef && this.inputRef.focusField(0);
    }, 5);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange(nextState) {
    if (nextState != 'active' || _this.props.isLocked) {
      Clipboard.setString(null);
      return;
    }

    setTimeout(() => {
      handleScorecardCodeClipboard(_this.props.handleInvalidUrl);
    }, 100);
  }

  onCodeFilled = (code) => {
    Clipboard.setString(null);
    this.props.joinScorecard(code);
  }

  render() {
    const {translations} = this.context;
    const disableStyle = { backgroundColor: Color.disableCardColor }

    return (
      <View>
        <Text style={styles.label}>
          {translations.enterScorecardCode}
        </Text>

        <OTPInputView
          ref={(ref) => this.inputRef = ref}
          style={styles.container}
          pinCount={6}
          codeInputFieldStyle={[styles.inputContainer, this.props.isLocked ? disableStyle : {}]}
          onCodeFilled = {(code) => this.onCodeFilled(code)}
          keyboardType='number-pad'
          editable={!this.props.isLocked}
        />
      </View>
    )
  }
}

export default ScorecardCodeInput;