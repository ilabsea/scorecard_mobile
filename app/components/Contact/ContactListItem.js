import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';

import { bodyFontSize, mediumIconSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';

export default class ContactListItem extends React.Component {
  static contextType = LocalizationContext;

  renderContactInfo(item) {
    return (
      <React.Fragment>
        <View style={{ flex: 1 }}>
          <Text style={{fontSize: bodyFontSize()}}>{ item.title }</Text>
          <Text style={{fontSize: bodyFontSize()}}>{ this.props.contact.value }</Text>
        </View>
        <View style={styles.rightItemContainer}>
          <Text style={{color: Color.clickableColor, fontSize: bodyFontSize()}}>{this.context.translations.contact}</Text>
          <Icon name='chevron-forward-outline' style={{color: Color.clickableColor, fontSize: mediumIconSize()}} />
        </View>
      </React.Fragment>
    )
  }

  render() {
    const { translations } = this.context;
    const item = this.props.contact.contact_type == 'email' ?
                 { title: translations.contact_email, icon: 'at', icon_color: 'red' }
                 : { title: translations.contact_number, icon: 'call', icon_color: '#1221ca' }

    return (
      <TouchableOpacity
        onPress={ () => !!this.props.onPress && this.props.onPress(this.props.contact) }
        style={[listItemStyles.listItem, listItemStyles.card, styles.container]}
      >
        <Icon name={item.icon} style={[styles.icon, { color: item.icon_color}]} />
        { this.renderContactInfo(item) }
      </TouchableOpacity>
    )
  }
}

const spacingSize = 16;

const styles = StyleSheet.create({
  container: {
    padding: spacingSize,
    alignItems: 'center',
    marginBottom: spacingSize
  },
  icon: {
    fontSize: getDeviceStyle(45, 35),
    marginRight: spacingSize
  },
  rightItemContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});