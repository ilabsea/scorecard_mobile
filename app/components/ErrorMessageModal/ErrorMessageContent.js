import React, { Component } from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';

import {
  ERROR_SCORECARD,
  ERROR_INTERNET,
} from '../../constants/error_constant';

class ErrorMessageContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return(
      <View>
        <Text style={CustomStyle.modalTitle}>
          { this.props.errorType == ERROR_SCORECARD &&
            translations.scorecardNotFound
          }
          { this.props.errorType == ERROR_INTERNET &&
            translations.noInternetConnection
          }
        </Text>
        <Text style={{marginTop: 10}}>
          { this.props.errorType == ERROR_SCORECARD &&
            translations.scorecardIsNotExist
          }
          { this.props.errorType == ERROR_INTERNET &&
            translations.thereIsNoInternetConnectionOnThisDevice
          }
        </Text>

        <View style={CustomStyle.modalBtnWrapper}>
          <CloseButton onPress={this.props.onDismiss} label={translations.close} />
        </View>
      </View>
    );
  }
}

export default ErrorMessageContent;