import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Player, Recorder} from '@react-native-community/audio-toolkit';
import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';

class VoiceRecord extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.recorderInterval = null;
    this.playInterval = null;
    this.filename = `${this.props.participantUUID}_${this.props.scorecardUUID}.mp4`;
    this.recorder = null;
    this.player = null;
    this.state = {
      isRecordButtonVisible: true,
      isRecording: false,
      isPlaying: false,
      isPause: false,
      recordDuration: 0,
      playDuration: 0,
      hasPermission: false,
    };
  }

  componentDidMount() {
    this.checkPermission();
  }

  checkPermission = () => {
    const rationale = {
      'title': 'Microphone Permission',
      'message': 'This mobile app require your microphone permission in order to be able to record the voice.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {this.setState({hasPermission: (result === true || result === PermissionsAndroid.RESULTS.GRANTED)});});
  }

  recordVoice = () => {
    if (!this.state.hasPermission) return;

    this.recorder = new Recorder(this.filename);
    this.recorder.prepare(() => {
      this.recorder.record(() => {
        this.setState({isRecording: true});
        this.recorderInterval = setInterval(() => {
          this.setState({recordDuration: this.state.recordDuration + 1});
        }, 1000);
      });
    });
  };

  stopRecordVoice = () => {
    if (this.recorder === null) return;

    clearInterval(this.recorderInterval);
    this.recorder.stop(() => {
      this.setState({
        isRecording: false,
        isRecordButtonVisible: false,
        playDuration: this.state.recordDuration,
      });
      this.props.finishRecord(this.recorder.fsPath);
    });
    this.player = new Player(this.filename);
  };

  countDownPlayDuration = () => {
    this.playInterval = setInterval(() => {
      let duration = this.state.playDuration;
      this.setState({playDuration: duration - 1});
      if (duration === 1) clearInterval(this.playInterval);
    }, 1000);
  };

  handlePlaying = () => {
    if (this.state.isPlaying) return this.pauseVoice();

    this.countDownPlayDuration();
    return this.playVoice();
  };

  playVoice = () => {
    this.player
      .play(() => {this.setState({isPlaying: true, isPause: false})})
      .on('ended', () => {
        this.setState({
          isPlaying: false,
          isPause: false,
          playDuration: this.state.recordDuration,
        });
        this.player = new Player(this.filename);
        clearInterval(this.playInterval);
      });
  };

  pauseVoice = () => {
    this.player.pause(() => {
      this.setState({isPlaying: false, isPause: true});
      clearInterval(this.playInterval);
    });
  };

  getCurrentTime = (duration) => {
    let date = new Date(null);
    date.setSeconds(duration);
    return date.toISOString().substr(11, 8);
  };

  renderRecordTime = () => {
    return (
      <Text style={{fontWeight: 'bold', fontSize: 18}}>
        {this.getCurrentTime(this.state.recordDuration)}
      </Text>
    );
  };

  renderRecordButton = () => {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          {this.state.isRecording && this.renderRecordTime()}
        </View>
        <TouchableOpacity
          onLongPress={() => this.recordVoice()}
          onPressOut={() => this.stopRecordVoice()}
          style={styles.voiceRecordButton}>
          <MaterialIcon name="mic" size={35} color="#ffffff" />
        </TouchableOpacity>
      </View>
    );
  };

  getPlayTime = () => {
    if (!this.isPlaying) return this.getRecordTime();

    let date = new Date(null);
    return date.setSeconds(this.state.playDuration);
  };

  delete = () => {
    this.recorder.destroy();
    this.player.destroy();
    this.setState({
      isRecordButtonVisible: true,
      isRecording: false,
      isPlaying: false,
      isPause: false,
      recordDuration: 0,
      playDuration: 0,
    });
    this.props.deleteAudio();
  };

  renderRecordedVoice = () => {
    return (
      <View style={styles.recordedVoiceContainer}>
        <View
          style={{
            flexDirection: 'row',
            padding: 16,
            borderRadius: 8,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity onPress={() => this.handlePlaying()}>
            {!this.state.isPlaying && (
              <MaterialIcon
                name="play-circle-filled"
                size={50}
                color={Color.primaryButtonColor}
              />
            )}
            {this.state.isPlaying && (
              <MaterialIcon
                name="pause-circle-filled"
                size={50}
                color={Color.primaryButtonColor}
              />
            )}
          </TouchableOpacity>
          <View style={{marginLeft: 15, justifyContent: 'center', flex: 1}}>
            <Text>Play</Text>
            <Text>{this.getCurrentTime(this.state.playDuration)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.delete()}
            style={{alignSelf: 'center'}}>
            <MaterialIcon name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 16, color: '#3a3a3a'}}>
            Record issue note as voice
          </Text>
        </View>
        {this.state.isRecordButtonVisible && this.renderRecordButton()}
        {!this.state.isRecordButtonVisible && this.renderRecordedVoice()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recordedVoiceContainer: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  voiceRecordButton: {
    backgroundColor: Color.primaryButtonColor,
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default VoiceRecord;