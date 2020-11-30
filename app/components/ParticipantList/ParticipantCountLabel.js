import React, {Component} from 'react';
import {View, Text} from 'react-native';

class ParticipantCountLabel extends Component {
  render() {
    return (
      <View style={this.props.customContainerStyle}>
        <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 18}}>
          {this.props.addedParticipant} / {this.props.totalParticipant}
        </Text>
      </View>
    );
  }
}

export default ParticipantCountLabel;