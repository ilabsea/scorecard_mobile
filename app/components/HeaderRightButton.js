import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

import Color from '../themes/color';
import { SELECTED_FILTERS } from '../constants/main_constant';

class HeaderRightButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iconColor: Color.whiteColor
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", async () => {
      const selectedFilters = await AsyncStorage.getItem(SELECTED_FILTERS);

      this.setState({ iconColor: selectedFilters ? Color.primaryColor : Color.whiteColor });
    });
  }
  
  componentWillUnmount() {
    this.focusListener();
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <AppIcon name={this.props.icon} size={20} color={this.state.iconColor} style={{padding: 16}} />
      </TouchableOpacity>
    )
  }
}

export default HeaderRightButton;