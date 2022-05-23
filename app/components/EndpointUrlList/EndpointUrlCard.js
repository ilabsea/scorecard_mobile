import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import CardItem from '../Share/CardItem';
import Color from '../../themes/color';
import { smallTextFontSize } from '../../utils/font_size_util';

class EndpointUrlCard extends React.Component {
  renderBadge() {
    return <View style={[styles.badge, {backgroundColor: this.props.endpoint.shortcut_color}]}>
            <Text style={{color: 'white', fontSize: smallTextFontSize(), textTransform: 'uppercase'}}>{ this.props.endpoint.shortcut }</Text>
           </View>
  }

  renderContent() {
    return <View>
            <View style={{flexDirection: 'row'}}>
              <Text>{ this.props.endpoint.label }</Text>
              { this.renderBadge() }
            </View>
            <Text style={{color: Color.grayColor}}>{ `${this.props.endpoint.email}@${this.props.endpoint.value}` }</Text>
           </View>
  }

  render() {
    return (
      <CardItem
        content={this.renderContent()}
        containerStyle={{ paddingVertical: 16 }}
      />
    )
  }
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    marginLeft: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25
  }
});

export default EndpointUrlCard;