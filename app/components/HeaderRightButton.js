import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Color from '../themes/color';
import { SELECTED_FILTERS } from '../constants/main_constant';

class HeaderRightButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSelectedFilter: false,
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", async () => {
      const selectedFilters = await AsyncStorage.getItem(SELECTED_FILTERS);
      this.setState({ hasSelectedFilter: selectedFilters });
    });
  }
  
  componentWillUnmount() {
    this.focusListener && this.focusListener();
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()} style={{position: 'relative'}}>
        <AppIcon name={this.props.icon} size={20} color={Color.whiteColor} style={{padding: 16}} />

        { this.state.hasSelectedFilter &&
          <View style={{width: 11, height: 11, borderRadius: 14, backgroundColor: '#7e390e', position: 'absolute', top: 13, right: 9}} />
        }
      </TouchableOpacity>
    )
  }
}

export default HeaderRightButton;