import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import endpointUrlHelper from '../../helpers/endpoint_url_helper';

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
    marginLeft: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
  },
  badgeLabel: {
    fontSize: 11,
    textTransform: 'uppercase'
  }
});

export default EndpointBadge;