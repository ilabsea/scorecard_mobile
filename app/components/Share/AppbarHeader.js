import React from 'react';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';

import NavigationHeaderBody from '../NavigationHeaderBody';
import HeaderIconButton from './HeaderIconButton';
import Color from '../../themes/color';
import { navigateBack } from '../../utils/navigation_util';

const AppbarHeader = (props) => {
  return (
    <Appbar.Header style={{backgroundColor: Color.headerColor, paddingRight: 10}}>
      <Appbar.BackAction onPress={() => navigateBack()} color='white' />
      <NavigationHeaderBody title={props.title} />
      <View style={{flexDirection: 'row'}}>
        { !!props.rightButton && props.rightButton }

        <HeaderIconButton onPress={() => props.onPressHome()} icon='home' iconStyle={{color: Color.whiteColor}} />
      </View>
    </Appbar.Header>
  )
}

export default AppbarHeader;