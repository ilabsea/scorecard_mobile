import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'native-base';
import Color from '../../themes/color';
import {getLanguageIndicator} from '../../services/language_indicator_service';
import AudioPlayer from '../../services/audio_player_service';
import {PLAYING, PAUSED} from '../../utils/variable';

class CriteriaAudioButton extends Component {
  constructor(props) {
    super(props);
    this._audioPlayer = null;
    this.audioFile = null;
    this.timeout = null;
    this.state = {
      iconName: 'volume-medium',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.playingIndicatorId != props.indicator.uuid)
      return { iconName: 'volume-medium' }

    return null;
  }

  hasAudio = () => {
    const languageIndicator = getLanguageIndicator(this.props.scorecardUUID, this.props.indicator.uuid, 'audio');
    if (languageIndicator != undefined) {
      this.audioFile = languageIndicator.local_audio;
      return (languageIndicator.local_audio === '' || languageIndicator.local_audio === null) ? false : true;
    }
    return false;
  }

  watchAudioPlayerState = () => {
    const _this = this;
    this.timeout = setInterval(() => {
      if (_this._audioPlayer === null || _this._audioPlayer.playState === PAUSED) {
        this.setState({iconName: 'volume-medium'});
        clearInterval(_this.timeout);
      }
      if (this.props.audioPlayer.audioFile != this.audioFile)
        clearInterval(_this.timeout);
    }, 1000);
  }

  handlePlayAudio = () => {
    if (this.timeout) clearInterval(this.timeout);
    if (this.props.audioPlayer === null)
      this._audioPlayer = new AudioPlayer(this.audioFile);
    else if (this.props.audioPlayer.audioFile != this.audioFile) {
      this.props.audioPlayer.release();
      this._audioPlayer = new AudioPlayer(this.audioFile);
    }
    else if (this.props.audioPlayer.audioFile === this.audioFile)
      this._audioPlayer.handlePlay();

    this.setState({iconName: this._audioPlayer.playState === PLAYING ? 'pause' : 'volume-medium'});
    if (this._audioPlayer.playState === PLAYING) this.watchAudioPlayerState()
    this.props.updateAudioState(this.props.indicator.uuid, this._audioPlayer);
  }

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        { this.hasAudio() &&
          <TouchableOpacity onPress={() => this.handlePlayAudio()} style={styles.playAudioButton}>

            <Icon name={this.state.iconName} style={{ color: Color.whiteColor}} />
          </TouchableOpacity>
        }
        { !this.hasAudio() && !this.props.isAddNewCriteria &&
          <View style={styles.noAudioIconContainer}>
            <Icon name='volume-mute' style={{ color: Color.whiteColor}} />
          </View>
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
  noAudioIconContainer: {
    backgroundColor: Color.paleBlackColor,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginRight: 10,
  }
});

export default CriteriaAudioButton;
