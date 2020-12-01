import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../themes/color';
import realm from '../../db/schema';
import AudioPlayer from '../../services/audio_player_service';

class CriteriaAudioButton extends Component {
  constructor(props) {
    super(props);
    this._audioPlayer = null;
    this.audioFile = null;
  }

  hasAudio = () => {
    const {indicator} = this.props;
    if (indicator.type === 'predefined') {
      const languageIndicator = realm.objects('LanguageIndicator').filtered(`indicator_id == '${indicator.uuid}'`)[0];
      if (languageIndicator != undefined) {
        this.audioFile = languageIndicator.local_audio;
        return languageIndicator.local_audio != '' ? true : false;
      }
      return false;
    }
    else if (indicator.type === 'custom') {
      const customIndicator = realm.objects('CustomIndicator').filtered(`uuid == '${indicator.uuid}'`)[0];
      if (customIndicator != undefined) {
        this.audioFile= customIndicator.audio;
        return customIndicator.audio != null ? true : false;
      }
      return false;
    }
  }

  renderAudioIcon = () => {
    if (this.props.playingIndicatorId === this.props.indicator.uuid)
      return <MaterialIcon name="pause" color="#ffffff" size={25} />

    return <MaterialIcon name="play-arrow" color="#ffffff" size={25} />
  }

  handlePlayAudio = () => {
    const {indicator} = this.props;
    if (this.props.audioPlayer === null)
      this._audioPlayer = new AudioPlayer(this.audioFile);
    else if (this.props.audioPlayer != null && this.props.audioPlayer.audioFile != this.audioFile) {
      this.props.audioPlayer.stop()
      this._audioPlayer = new AudioPlayer(this.audioFile);
    }
    this._audioPlayer.playPause();
    this.props.updateAudioState(indicator.uuid, this._audioPlayer);
  }

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        { this.hasAudio() &&
          <TouchableOpacity onPress={() => this.handlePlayAudio()} style={styles.playAudioButton}>
            {this.renderAudioIcon()}
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  playAudioButton: {
    height: 36,
    width: 36,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primaryButtonColor,
    borderRadius: 20,
    marginRight: 14,
    marginLeft: 10,
  },
});

export default CriteriaAudioButton;