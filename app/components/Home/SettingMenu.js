import React, { Component } from 'react';
import { Menu, Divider } from 'react-native-paper';
import AppIcon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import { environment } from '../../config/environment';

class SettingMenu extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
    this.getBackendUrl();
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", async () => {
      this.getBackendUrl();
    });
  }
  
  componentWillUnmount() {
    this.focusListener && this.focusListener();
  }

  getBackendUrl() {
    AsyncStorage.getItem('SETTING', (err, result) => {
      const savedSetting = JSON.parse(result);
      this.backendUrl = (!!savedSetting && !!savedSetting.backendUrl) ? savedSetting.backendUrl : environment.defaultEndpoint;
    });
  }

  navigate = (screen, params) => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate(screen, params);
  }

  render() {
    const { translations } = this.context;

    return (
      <Menu
        visible={this.state.isVisible}
        onDismiss={() => this.setState({ isVisible: false })}
        anchor={
          <AppIcon name="settings" size={20} color={Color.whiteColor}
            onPress={() => this.setState({ isVisible: true })}
            style={{padding: 16}}
          />
        }
      >
        <Menu.Item
          onPress={() => this.navigate('Setting', { backend_url: this.backendUrl })}
          title={translations.setting}
          icon='wrench'
        />
        <Divider />
        <Menu.Item
          onPress={() => this.navigate('About', null)}
          title={translations.about}
          icon='information'
        />
      </Menu>
    );
  }
}

export default SettingMenu;
