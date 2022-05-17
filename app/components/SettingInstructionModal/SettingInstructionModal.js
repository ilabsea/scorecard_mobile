import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../Translations';
import SaveButton from '../SaveButton';
import OutlineInfoIcon from '../OutlineInfoIcon';
import { navigate } from '../../navigators/app_navigator';

import { environment } from '../../config/environment';
import Color from '../../themes/color';
import CustomStyle from '../../themes/customStyle';
import scorecardEndpointService from '../../services/scorecard_endpoint_service';
import { bodyFontSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import MessageModalTabletStyles from '../../styles/tablet/MessageModalComponentStyle';
import MessageModalMobileStyles from '../../styles/mobile/MessageModalComponentStyle';

const responsiveStyles = getDeviceStyle(MessageModalTabletStyles, MessageModalMobileStyles);

class SettingInstructionModal extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    AsyncStorage.getItem('SETTING', (err, result) => {
      const savedSetting = JSON.parse(result);
      this.backendUrl = (!!savedSetting && !!savedSetting.backendUrl) ? savedSetting.backendUrl : environment.defaultEndpoint;
    });
  }

  renderHeader() {
    return <View style={{flexDirection: 'row'}}>
              <OutlineInfoIcon color={Color.warningColor} />
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{height: 48, justifyContent: 'center'}}>
                  <Text style={[CustomStyle.modalTitle, { marginBottom: 0 }]}>
                    { this.context.translations.reauthenticationRequired }
                  </Text>
                </View>
              </View>
            </View>
  }

  renderBody() {
    return <View style={{marginTop: 20, marginBottom: 10}}>
              <Text style={{ textAlign: 'center', fontSize: bodyFontSize() }}>
                { this.context.translations.reauthenticationDescription }
              </Text>
            </View>
  }

  goToSetting() {
    this.props.onDismiss();
    scorecardEndpointService.setIsNotFirstTimeAppOpen();
    navigate('Setting', { backend_url: this.backendUrl, update_scorecard: true });
  }

  renderFooter() {
    return <View style={[CustomStyle.modalBtnWrapper, { justifyContent: 'center' }]}>
              <SaveButton label={ this.context.translations.goToSetting } onPress={() => this.goToSetting()}
                customStyle={{ width: '100%', marginLeft: 0 }}
              />
            </View>
  }

  render() {
    return (
      <Portal>
        <Modal visible={this.props.visible} contentContainerStyle={[CustomStyle.modalContainer, responsiveStyles.container]}>
          { this.renderHeader() }
          { this.renderBody() }
          { this.renderFooter() }
        </Modal>
      </Portal>
    )
  }
}

export default SettingInstructionModal;