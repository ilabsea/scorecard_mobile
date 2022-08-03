import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';

class ParticipantModalListItemRightIcon extends React.Component {
  render() {
    const isRaisedParticipant =  this.props.raisedParticipantUuids.filter(raisedParticipantUuid => raisedParticipantUuid == this.props.participant.uuid).length > 0;
    return isRaisedParticipant ? <Icon name='check' size={getDeviceStyle(28, 23)} color={ Color.clickableColor } style={{marginLeft: 5}} /> : <View/>
  }
}

export default ParticipantModalListItemRightIcon;