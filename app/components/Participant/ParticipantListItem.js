import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {LocalizationContext} from '../Translations';
import ParticipantAttributes from './ParticipantAttributes';
import CardItem from '../Share/CardItem';

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

  renderContent() {
    return (
      <View style={{ flexDirection: 'row' }}>
        { this.renderOrderNumber() }
        { this.renderAttributes() }
      </View>
    )
  }

  render() {
    return (
      <CardItem
        content={this.renderContent()}
        onPress={() => this.props.showParticipantBottomSheet(this.props.participant)}
      />
    )
  }
}

export default ParticipantListItem;