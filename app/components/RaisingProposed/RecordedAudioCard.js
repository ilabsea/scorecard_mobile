import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import { bodyFontSize } from '../../utils/font_size_util';
import { getTimeFromDuration } from '../../utils/time_util';

class RecordedAudioCard extends Component {
  static contextType = LocalizationContext;

  renderPlayIcon = () => {
    let iconName = this.props.isPlaying ? 'pause-circle-filled' : 'play-circle-filled';
    return (<MaterialIcon name={iconName} size={56} color={Color.primaryButtonColor} />)
  }

  render () {
    return (
      <View style={styles.recordedVoiceContainer}>
        <View style={{flexDirection: 'row', padding: 16, borderRadius: 8, backgroundColor: Color.whiteColor}}>
          <TouchableOpacity onPress={() => this.props.handlePlaying()}>
            {this.renderPlayIcon()}
          </TouchableOpacity>
          <View style={{marginLeft: 15, justifyContent: 'center', flex: 1}}>
            <Text style={{fontSize: bodyFontSize()}}>{this.context.translations.play}</Text>
            <Text style={{fontSize: bodyFontSize()}}>{getTimeFromDuration(this.props.playSeconds)}</Text>
          </View>
          <TouchableOpacity onPress={() => this.props.delete()} style={{alignSelf: 'center'}}>
            <MaterialIcon name="delete" size={30} color={Color.redColor} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  recordedVoiceContainer: {
    borderRadius: 8,
    shadowColor: Color.blackColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default RecordedAudioCard;