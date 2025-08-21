import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal, ActivityIndicator } from 'react-native-paper';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { FontFamily, FontSize } from '../../assets/stylesheets/theme';

import { LocalizationContext } from '../Translations';
import ErrorAlertMessage from '../Share/ErrorAlertMessage';

import HomeInfoMessageModalTabletStyles from '../../styles/tablet/HomeInfoMessageModalComponentStyle';
import HomeInfoMessageModalMobileStyles from '../../styles/mobile/HomeInfoMessageModalComponentStyle';

const styles = getDeviceStyle(HomeInfoMessageModalTabletStyles, HomeInfoMessageModalMobileStyles);

class HomeInfoModal extends Component {
  static contextType = LocalizationContext;

  _renderSpinner() {
    const { translations } = this.context;
    const scorecardCode = <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>

    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContentWrapper}>
          <ActivityIndicator color={Color.primaryColor} style={{marginLeft: -5}} />
          <Text style={{paddingLeft: 20, fontSize: FontSize.body, fontFamily: FontFamily.body}} numberOfLines={1}>
            { translations.formatString(translations.joiningTheScorecard, scorecardCode) }
          </Text>
        </View>
      </View>
    )
  }

  renderLoading() {
    return <Portal>
              <Modal visible={this.props.isLoading} contentContainerStyle={{ alignItems: 'center' }}>
                { this._renderSpinner() }
              </Modal>
           </Portal>
  }

  renderErrorMessage() {
    return <ErrorAlertMessage
              visible={ this.props.visible }
              errorType={ this.props.errorType }
              scorecardUuid={ this.props.scorecardUuid }
              unlockAt={ this.props.unlockAt }
              hasConfirmButton={false}
              onDismiss={ this.props.onDismiss }
           />
  }

  render() {
    return this.props.isLoading ? this.renderLoading() : this.renderErrorMessage();
  }
}

export default HomeInfoModal;