import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';

import {LocalizationContext} from '../Translations';
import ParticipantAttributes from './ParticipantAttributes';

import Color from '../../themes/color';
import listItemStyles from '../../themes/scorecardListItemStyle';
import { mediumIconSize } from '../../utils/font_size_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const styles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantListItem extends Component {
  static contextType = LocalizationContext;

  renderOrderNumber() {
    return <View style={{justifyContent: 'center'}}>
            <View style={styles.numberContainer}>
              <Text style={styles.numberLabel}>{this.props.index + 1}</Text>
            </View>
          </View>
  }

  renderAttributes() {
    return <View style={{paddingLeft: 0, justifyContent: 'center', flex: 1}}>
            <ParticipantAttributes participant={this.props.participant}/>
           </View>
  }

  renderArrowIcon() {
    return <View style={{justifyContent: 'center'}}>
            <Icon name='chevron-forward-outline' style={{color: Color.headerColor, fontSize: mediumIconSize(), width: getDeviceStyle(16, 13)}} />
           </View>
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.showParticipantBottomSheet(this.props.participant)}
        style={[styles.itemContainer, listItemStyles.card]}
      >
        { this.renderOrderNumber() }
        { this.renderAttributes() }
        { this.renderArrowIcon() }
      </TouchableOpacity>
    )
  }
}

export default ParticipantListItem;