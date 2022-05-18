import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../Translations';
import SaveButton from '../SaveButton';

import { navigate } from '../../navigators/app_navigator';
import { environment } from '../../config/environment';
import CustomStyle from '../../themes/customStyle';
import appStatusService from '../../services/app_status_service';

class ReLoginMessageModalFooter extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    AsyncStorage.getItem('SETTING', (err, result) => {
      const savedSetting = JSON.parse(result);
      this.backendUrl = (!!savedSetting && !!savedSetting.backendUrl) ? savedSetting.backendUrl : environment.defaultEndpoint;
    });
  }

  goToSetting() {
    this.props.onDismiss();
    appStatusService.setIsNotFirstTimeAppOpen();
    navigate('Setting', { backend_url: this.backendUrl, has_scorecard_migration: true });
  }

  render() {
    return <View style={[CustomStyle.modalBtnWrapper, { justifyContent: 'center' }]}>
              <SaveButton label={ this.context.translations.goToSetting } onPress={() => this.goToSetting()}
                customStyle={{ width: '100%', marginLeft: 0 }}
              />
            </View>
  }
}

export default ReLoginMessageModalFooter;