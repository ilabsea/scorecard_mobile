import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import uuidV4 from '../../utils/uuidv4';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import styles from '../../themes/scorecardListItemStyle';

export default class ContactListItem extends Component {
  static contextType = LocalizationContext;

  renderStatusIcon(item, iconName) {
    return (
      <View style={[styles.statusIconWrapper]}>
        <Icon name={iconName} style={{fontSize: 50, color: '#fff'}} />
      </View>
    )
  }

  render() {
    const { translations } = this.context;
    const { contact } = this.props;
    const iconName = contact.contact_type == 'email' ? 'at' : 'call';
    const title = contact.contact_type == 'email' ? translations.contact_email : translations.contact_number;

    return (
      <TouchableOpacity
        key={uuidV4()}
        onPress={ () => !!this.props.onPress && this.props.onPress() }
        style={[styles.listItem, styles.card]}>

        { this.renderStatusIcon(contact, iconName) }

        <View style={styles.contentWrapper}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>

          <View style={styles.subTextWrapper}>
            <Icon name={iconName} style={styles.subTextIcon} />
            <Text style={styles.subText}>{contact.value}</Text>
          </View>

          <View style={{flex: 1}}></View>

          <View style={styles.viewDetail}>
            <Text style={{color: Color.headerColor}}>{translations.contact}</Text>
            <Icon name='chevron-forward-outline' style={{fontSize: 24, color: Color.headerColor}} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
