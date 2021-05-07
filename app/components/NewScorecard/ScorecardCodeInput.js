import React, { Component } from 'react';
import { View, Text, Keyboard } from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import Clipboard from '@react-native-clipboard/clipboard';

import { LocalizationContext } from '../Translations';

import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardCodeInputTabletStyles from '../../styles/tablet/ScorecardCodeInputComponentStyle';
import ScorecardCodeInputMobileStyles from '../../styles/mobile/ScorecardCodeInputComponentStyle';

const styles = getDeviceStyle(ScorecardCodeInputTabletStyles, ScorecardCodeInputMobileStyles);
class ScorecardCodeInput extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.inputRef = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.inputRef.focus();
    }, 50);
  }

  handleChange = (code) => {
    if (code.length == 6) {
      Keyboard.dismiss();
      Clipboard.setString(null);
      this.props.joinScorecard(code);
    }
  }

  render() {
    const {translations} = this.context;
    return (
      <View>
        <Text style={styles.label}>
          {translations.enterScorecardCode}
        </Text>

        <OtpInputs
          ref={(ref) => this.inputRef = ref}
          handleChange={(code) => this.handleChange(code)}
          numberOfInputs={6}
          keyboardType='number-pad'
          style={styles.container}
          inputStyles={styles.inputContainer}
        />
      </View>
    )
  }
}

export default ScorecardCodeInput;