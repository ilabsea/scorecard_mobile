import React, { Component } from 'react';
import { Menu, Divider } from 'react-native-paper';
import AppIcon from 'react-native-vector-icons/MaterialIcons';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';

class SettingMenu extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  navigate = (screen) => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate(screen);
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
          onPress={() => this.navigate('Setting')}
          title={translations.setting}
          icon='wrench'
        />
        <Divider />
        <Menu.Item
          onPress={() => this.navigate('About')}
          title={translations.about}
          icon='information'
        />
      </Menu>
    );
  }
}

export default SettingMenu;
