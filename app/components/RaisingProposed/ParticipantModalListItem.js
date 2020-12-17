import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {Icon, Button, Text} from 'native-base';
import { Modal, Portal, Divider } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ActionButton from '../ActionButton';
import Color from '../../themes/color';
import realm from '../../db/schema';
import styles from '../../themes/participantListItemStyle';

export default class ParticipantModalListItem extends Component {
  static contextType = LocalizationContext;

  onPress(item) {
    !!this.props.onPress && !!this.props.onPress(item.uuid);
  }

  renderGender = (participant) => {
    if (participant === undefined) return (<Text style={{marginLeft: 16}}>---</Text>);

    if (participant.gender === '') {
      return (<MaterialIcon name="person" size={25} color="#b9b9b9" style={{paddingHorizontal: 10, marginLeft: 16}} />);
    }

    const gender = participant.gender === 'other' ? 'transgender' : participant.gender;
    return (<FontAwesomeIcon name={gender} size={25} style={{paddingHorizontal: 10, marginLeft: 16}} color="black" />);
  };

  getDescription(item, translations) {
    let arr = ['disability', 'minority', 'poor', 'youth'];
    let description = [];

    for(let i=0; i<arr.length; i++) {
      if(item[arr[i]]) {
        description.push(translations[arr[i]]);
      }
    }

    return description.join('; ');
  }

  renderParticipantItem() {
    const item = this.props.participant;
    const { translations } = this.context;

    return (
      <View>
        <TouchableOpacity onPress={() => this.onPress(item)} style={styles.participantItem}>
          <View style={styles.numberContainer}>
            <Text style={styles.numberLabel}>{item.order+1}</Text>
          </View>

          <View style={{flexDirection: 'row', flex: 1}}>
            { this.renderGender(item) }
            <Text style={{marginLeft: 10}}>{translations.age}: {item.age}</Text>
            <Text style={{marginLeft: 10, flex: 1}} numberOfLines={1}>{this.getDescription(item, translations)}</Text>
          </View>

          <MaterialIcon name="arrow-forward-ios" color="black" />
        </TouchableOpacity>
        <Divider />
      </View>
    );
  }

  render() {
    return this.renderParticipantItem();
  }
}
