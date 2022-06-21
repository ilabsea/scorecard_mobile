import React from 'react';
import { View, Text } from 'react-native';

import { bodyFontSize } from '../../utils/font_size_util';

import ModalHeader from './InfoModal/ModalHeader';
import { LocalizationContext } from '../Translations';
import ModalBottomButtons from './InfoModal/ModalBottomButtons';

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

        <ModalBottomButtons
          onClose={this.props.onDismiss}
          closeButtonLabel={translations.close}
          hasConfirmButton={this.props.hasConfirmButton}
          confirmButtonLabel={this.props.confirmButtonLabel}
          isConfirmButtonDisabled={this.props.isConfirmButtonDisabled}
          onConfirm={() => this.props.onConfirm()}
        />
      </View>
    )
  }
}

export default InfoModalMain;