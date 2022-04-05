import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../themes/color';
import { isCreateNewIndicatorScreen } from '../../utils/screen_util';
import { getDeviceStyle } from '../../utils/responsive_util';

class ParticipantModalListItemRightIcon extends React.Component {
  renderIcon() {
    const isRaisedParticipant =  this.props.raisedParticipantUuids.filter(raisedParticipantUuid => raisedParticipantUuid == this.props.participant.uuid).length > 0;

    if (isCreateNewIndicatorScreen() && this.props.isIndicatorBase)
      return isRaisedParticipant ? <Icon name='check' size={getDeviceStyle(28, 23)} color={ Color.clickableColor } /> : <View/>

    return <Icon name="arrow-forward-ios" color={Color.blackColor} />;
  }

  render() {
    return this.renderIcon();
  }
}

export default ParticipantModalListItemRightIcon;