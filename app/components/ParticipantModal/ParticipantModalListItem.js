import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {Text} from 'native-base';
import { Divider } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../themes/participantListItemStyle';

import GenderIcon from '../Share/GenderIcon';

import { iconSize } from '../../utils/participant_list_util';
import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantModalListItemTabletStyles from '../../styles/tablet/ParticipantModalListItemComponentStyle';
import ParticipantModalListItemMobileStyles from '../../styles/mobile/ParticipantModalListItemComponentStyle';

const responsiveStyles = getDeviceStyle(ParticipantModalListItemTabletStyles, ParticipantModalListItemMobileStyles);

export default class ParticipantModalListItem extends Component {
  static contextType = LocalizationContext;

  onPress(item) {
    !!this.props.onPress && !!this.props.onPress(item.uuid);
  }

  renderGender = (participant) => {
    if (participant === undefined || participant.gender === '') return (<Text style={{marginLeft: 16}}>---</Text>);

    return <GenderIcon gender={participant.gender}
              size={iconSize} color={Color.blackColor}
              containerStyle={{width: 60, borderWidth: 0, marginRight: -6}}
            />
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

  renderRightIcon() {
    return !!this.props.rightIcon ? this.props.rightIcon : <MaterialIcon name="arrow-forward-ios" color={Color.blackColor} />
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
            <Text style={responsiveStyles.label}>{translations.age}: {item.age}; </Text>
            <Text style={[{flex: 1}, responsiveStyles.label]} numberOfLines={1}>{this.getDescription(item, translations)}</Text>
          </View>

          { this.renderRightIcon() }
        </TouchableOpacity>
        <Divider />
      </View>
    );
  }

  render() {
    return this.renderParticipantItem();
  }
}