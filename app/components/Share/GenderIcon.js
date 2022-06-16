import React from 'react';
import { View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import participantHelper from '../../helpers/participant_helper';

class GenderIcon extends React.Component {

  renderMaleFemaleIcon() {
    const iconName = participantHelper.getGenderIconLabel(this.props.gender);
    return <FontAwesomeIcon name={iconName} size={this.props.size} color={this.props.color} />
  }

  renderOtherIcon() {
    const circleStyle = {
      width: this.props.otherIconSize,
      height: this.props.otherIconSize,
      borderRadius: this.props.otherIconSize,
      borderWidth: this.props.otherIconSize >= 18 ? 2 : 1.5,
      borderColor: this.props.color,
    }

    return <View style={this.props.otherIconContainerStyle}>
              <View style={circleStyle} />
              <AntDesignIcon name='question' size={this.props.size} color={this.props.color}
                style={[{position: 'absolute'}, this.props.questionIconStyle]}
              />
           </View>
  }

  render() {
    return <View style={[{ alignItems: 'center' }, this.props.containerStyle]}>
              { this.props.gender == 'other' ? this.renderOtherIcon() : this.renderMaleFemaleIcon() }
           </View>
  }
}

export default GenderIcon;