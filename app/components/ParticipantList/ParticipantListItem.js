import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

import {LocalizationContext} from '../Translations';
import ParticipantListItemAttributes from './ParticipantListItemAttributes';

import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';
import { navigate } from '../../navigators/app_navigator';
import { mediumIconSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const styles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantListItem extends Component {
  static contextType = LocalizationContext;

  editParticipant = () => {
    const participantUuid = this.props.participant != undefined ? this.props.participant.uuid : null;
    navigate('AddNewParticipant', { scorecard_uuid: this.props.scorecardUuid, index: this.props.index, participant_uuid: participantUuid });
  }

  renderOrderNumber() {
    return <View style={{justifyContent: 'center'}}>
            <View style={styles.numberContainer}>
              <Text style={styles.numberLabel}>{this.props.index + 1}</Text>
            </View>
          </View>
  }

  renderAttributes() {
    return <View style={{paddingLeft: 0, justifyContent: 'center', flex: 1}}>
            <ParticipantListItemAttributes participant={this.props.participant}/>
           </View>
  }

  renderArrowIcon() {
    return <View style={{justifyContent: 'center'}}>
            <Icon name='chevron-forward-outline' style={{color: Color.headerColor, fontSize: mediumIconSize(), width: 13}} />
           </View>
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.editParticipant()} style={[styles.itemContainer, listItemStyles.card]}>
        { this.renderOrderNumber() }
        { this.renderAttributes() }
        { this.renderArrowIcon() }
      </TouchableOpacity>
    )
  }
}

export default ParticipantListItem;