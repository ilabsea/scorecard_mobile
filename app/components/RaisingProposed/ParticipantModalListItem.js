import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {Text} from 'native-base';
import { Divider } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../themes/participantListItemStyle';

import participantHelper from '../../helpers/participant_helper';
import { textLabelSize, iconSize } from '../../utils/participant_list_util';

export default class ParticipantModalListItem extends Component {
  static contextType = LocalizationContext;

  onPress(item) {
    !!this.props.onPress && !!this.props.onPress(item.uuid);
  }

  renderGender = (participant) => {
    if (participant === undefined) return (<Text style={{marginLeft: 16}}>---</Text>);

    if (participant.gender === '') {
      return (<MaterialIcon name="person" size={iconSize} color="#b9b9b9" style={{paddingHorizontal: 10, marginLeft: 16}} />);
    }

    const gender = participantHelper.getGenderIconLabel(participant.gender);
    return (<FontAwesomeIcon name={gender} size={iconSize} style={{paddingHorizontal: 10, marginLeft: 16}} color="black" />);
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
            <Text style={{marginLeft: 10, fontSize: textLabelSize}}>{translations.age}: {item.age}</Text>
            <Text style={{marginLeft: 10, flex: 1, fontSize: textLabelSize}} numberOfLines={1}>{this.getDescription(item, translations)}</Text>
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
