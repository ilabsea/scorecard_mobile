import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import endpointUrlHelper from '../../helpers/endpoint_url_helper';
import { isShortWidthScreen } from '../../utils/responsive_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

const EndpointBadge = (props) => {
  const {shortcut, shortcut_bg_color, shortcut_text_color} = props.endpoint;

  return <View style={[styles.badge, {backgroundColor: endpointUrlHelper.getColor(shortcut_bg_color, 'background')}, props.badgeStyle]}>
            <Text style={[styles.badgeLabel, {color: endpointUrlHelper.getColor(shortcut_text_color, 'type')}]}>
              { shortcut }
            </Text>
         </View>
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 4,
    marginLeft: isShortWidthScreen() ? 4 : 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
  },
  badgeLabel: {
    fontSize: isShortWidthScreen() ? 9 : 10,
    fontFamily: FontFamily.body,
    textTransform: 'uppercase'
  }
});

export default EndpointBadge;