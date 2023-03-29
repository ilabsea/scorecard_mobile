import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
            <View style={[styles.numberContainer, this.props.customNumberContainerStyle]}>
              <Text style={[styles.numberLabel, this.props.customNumberLabelStyle]}>{this.props.participant.order + 1}</Text>
            </View>
          </View>
  }

  renderAttributes() {
    return <ParticipantListItemAttributes participant={this.props.participant} fontSize={this.props.fontSize}
              labelColor={this.props.labelColor}
              customGenderStyle={this.props.customGenderStyle}
           />
  }

  render() {
    return (
      <TouchableOpacity style={[{flexDirection: 'row', borderWidth: 0}, this.props.containerStyle]}
        onPress={() => this.props.onPress && this.props.onPress()}
        onLongPress={() => this.props.onLongPress && this.props.onLongPress()}
        disabled={this.props.disabled || false}
      >
        <View style={{flexDirection: 'row', flex: 1, borderWidth: 0, alignItems: 'center'}}>
          { this.props.isDraggable && <Icon name="more-vert" style={{color: Color.lightGrayColor, fontSize: 20, textAlign: 'center'}} /> }
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