import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import RightArrowIcon from './RightArrowIcon';
import ParticipantListItemAttributes from './ParticipantListItemInfo/ParticipantListItemAttributes';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import ParticipantListItemTabletStyles from '../../styles/tablet/ParticipantListItemComponentStyle';
import ParticipantListItemMobileStyles from '../../styles/mobile/ParticipantListItemComponentStyle';

const styles = getDeviceStyle(ParticipantListItemTabletStyles, ParticipantListItemMobileStyles);

class ParticipantListItemInfo extends React.Component {
  constructor(props) {
    super(props);
    this.hasArrowIcon = props.hasArrowIcon || false;
  }

  renderOrderNumber() {
    return <View style={{justifyContent: 'center'}}>
            <View style={styles.numberContainer}>
              <Text style={styles.numberLabel}>{this.props.participant.order + 1}</Text>
            </View>
          </View>
  }

  renderAttributes() {
    return <ParticipantListItemAttributes participant={this.props.participant} fontSize={this.props.fontSize} />
  }

  render() {
    return (
      <TouchableOpacity style={[{flexDirection: 'row'}, this.props.containerStyle]}
        onPress={() => this.props.onPress()}
      >
        <View style={{flexDirection: 'row', flex: 1, borderWidth: 0, alignItems: 'center'}}>
          { this.renderOrderNumber() }
          { this.renderAttributes() }
        </View>
        { this.hasArrowIcon && <RightArrowIcon color={this.props.arrowColor || Color.blackColor} /> }
        { this.props.rightIcon }
      </TouchableOpacity>
    )
  }
}

export default ParticipantListItemInfo