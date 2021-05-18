import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';
import OutlineInfoIcon from '../OutlineInfoIcon';

import { getDeviceStyle } from '../../utils/responsive_util';
import PopupModalTabletStyles from '../../styles/tablet/PopupModalComponentStyle';
import PopupModalMobileStyles from '../../styles/mobile/PopupModalComponentStyle';

const responsiveStyles = getDeviceStyle(PopupModalTabletStyles, PopupModalMobileStyles);

class ErrorMessageContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return(
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{alignContent: 'flex-start'}}>
            <OutlineInfoIcon color={Color.warningColor} />
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={responsiveStyles.label}>
              { translations.formatString(translations.scorecardIsNotExist, this.props.scorecardUuid) }
            </Text>
          </View>
        </View>

        <View style={[CustomStyle.modalBtnWrapper, { marginTop: 8 }]}>
          <CloseButton onPress={this.props.onDismiss} label={translations.infoCloseLabel} />
        </View>
      </View>
    );
  }
}

export default ErrorMessageContent;