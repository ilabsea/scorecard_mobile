import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import { environment } from '../../config/environment';
import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';
import { getErrorMessageContent } from '../../utils/modal_error_message_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { LocalizationContext } from '../Translations';
import LockDeviceModalMessage from '../LockDeviceModalMessage';

import HomeInfoMessageModalTabletStyles from '../../styles/tablet/HomeInfoMessageModalComponentStyle';
import HomeInfoMessageModalMobileStyles from '../../styles/mobile/HomeInfoMessageModalComponentStyle';

const styles = getDeviceStyle(HomeInfoMessageModalTabletStyles, HomeInfoMessageModalMobileStyles);

class HomeInfoModal extends Component {
  static contextType = LocalizationContext;

  state = {
    backendUrl: ''
  }

  async componentDidMount() {
    const setting = await AsyncStorage.getItem('SETTING');
    this.setState({
      backendUrl: setting != null ? JSON.parse(setting).backendUrl : environment.defaultEndpoint,
    });
  }

  _renderSpinner() {
    const { translations } = this.context;
    const scorecardCode = <Text style={{fontWeight: 'bold'}}>{ this.props.scorecardUuid }</Text>

    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContentWrapper}>
          <Spinner color={Color.primaryColor} style={{marginLeft: -5}} />
          <Text style={{paddingLeft: 20}} numberOfLines={1}>
            { translations.formatString(translations.joiningTheScorecard, scorecardCode) }
          </Text>
        </View>
      </View>
    )
  }

  _renderInfoMessage = () => {
    const params = {
      error_type: this.props.errorType,
      is_new_scorecard: true,
      is_submit: false,
      scorecard_uuid: this.props.scorecardUuid,
      backend_url: this.state.backendUrl,
    };

    return getErrorMessageContent(params, this.props.onDismiss);
  }

  _renderContent() {
    if (!!this.props.unlockAt)
      return <LockDeviceModalMessage onDismiss={this.props.onDismiss} unlockAt={this.props.unlockAt} />

    return (
      <View>
        { this.props.isLoading && this._renderSpinner() }
        { !this.props.isLoading && !!this.props.errorType && this._renderInfoMessage() }
      </View>
    )
  }

  render() {
    const contentStyle = this.props.isLoading ? {alignItems: 'center'} : [CustomStyle.modalContainer, styles.modalContentContainer];

    return (
      <Portal>
        <Modal visible={this.props.visible} contentContainerStyle={contentStyle}>
          { this._renderContent() }
        </Modal>
      </Portal>
    )
  }
}

export default HomeInfoModal;