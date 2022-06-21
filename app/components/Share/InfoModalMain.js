import React from 'react';
import { View, Text } from 'react-native';

import CustomStyle from '../../themes/customStyle';
// import Color from '../../themes/color';
import { bodyFontSize } from '../../utils/font_size_util';

import ModalHeader from './InfoModal/ModalHeader';
import { LocalizationContext } from '../Translations';
// import ModalConfirmationButtons from '../ModalConfirmationButtons';
import CloseButton from '../CloseButton';

class InfoModalMain extends React.Component {
  static contextType = LocalizationContext;

  render() {
    const { translations, appLanguage } = this.context;

    return (
      <View>
        <ModalHeader title={ this.props.title } />

        <View style={{marginBottom: 10, marginTop: appLanguage == 'km' ? 20 : 15}}>
          <Text style={{ textAlign: 'center', fontSize: bodyFontSize() }}>
            { this.props.description }
          </Text>
        </View>

        <View style={CustomStyle.modalBtnWrapper}>
          <CloseButton onPress={this.props.onDismiss} label={translations.close} />
        </View>
      </View>
    )
  }
}

export default InfoModalMain;