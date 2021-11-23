import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import { Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';
import { getErrorMessageContent } from '../../utils/modal_error_message_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import { LocalizationContext } from '../Translations';

import HomeInfoModalTabletStyles from '../../styles/tablet/HomeInfoModalComponentStyle';
import HomeInfoModalMobileStyles from '../../styles/mobile/HomeInfoModalComponentStyle';

const styles = getDeviceStyle(HomeInfoModalTabletStyles, HomeInfoModalMobileStyles);

class HomeInfoModal extends Component {
  static contextType = LocalizationContext;

  state = {
    backendUrl: '',
  }

  async componentDidMount() {
    const setting = await AsyncStorage.getItem('SETTING');
    this.setState({
      backendUrl: setting != null ? JSON.parse(setting).backendUrl : 'https://isaf.digital-csc.org',
    }, () => {
      AsyncStorage.setItem('ENDPOINT_URL', this.state.backendUrl);
    });
  }

  _renderSpiner() {
    const { translations } = this.context;

    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContentWrapper}>
          <Spinner color={Color.primaryColor} style={{marginLeft: -5}} />
          <Text style={{paddingLeft: 20}} numberOfLines={1}>
            { translations.formatString(translations.joiningTheScorecard, this.props.scorecardUuid) }
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
    return (
      <View>
        { this.props.isLoading && this._renderSpiner() }
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