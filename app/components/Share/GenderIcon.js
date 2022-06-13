import React from 'react';
import { View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import participantHelper from '../../helpers/participant_helper';

class GenderIcon extends React.Component {

  renderMaleFemaleIcon() {
    const iconName = participantHelper.getGenderIconLabel(this.props.gender);
    return <FontAwesomeIcon name={iconName} size={this.props.size} style={this.props.iconStyle} color={this.props.color} />
  }

  renderTransgenderIcon() {
    const subIconSize = this.props.size >= 30 ? this.props.size - 15 : this.props.size - 10;

    return (
      <View style={[{position: 'relative', borderWidth: 0}, this.props.containerStyle]}>
        <FontAwesomeIcon name='user' size={this.props.size - 4} color={this.props.color} style={this.props.iconStyle} />

        <FontAwesomeIcon name='question' size={subIconSize} color={this.props.color}
          style={{ position: 'absolute', top: -4, right: -2 }}
        />
      </View>
    )
  }

  render() {
    return this.props.gender == 'other' ? this.renderTransgenderIcon() : this.renderMaleFemaleIcon();
  }
}

export default GenderIcon;