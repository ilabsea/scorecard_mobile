import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {Recorder} from '@react-native-community/audio-toolkit';
import Tooltip from 'react-native-walkthrough-tooltip';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import AudioPlayer from '../../services/audio_player_service';
import {PLAYING, PAUSED} from '../../utils/variable';
import realm from '../../db/schema';

class VoiceRecord extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.recorderInterval = null;
    this.playInterval = null;
    this.filename = '';
    this.recorder = null;
    this.audioPlayer = null;
    this.state = {
      isRecordButtonVisible: true,
      isRecording: false,
      isPlaying: false,
      recordDuration: 0,
      playSeconds: 0,
      hasPermission: false,
      toolTipVisible: false,
    };
  }

  componentDidMount() {
    this.checkPermission();
    const customIndicators = realm.objects('CustomIndicator').filtered(`scorecard_uuid == '${this.props.scorecardUUID}'`);
    this.filename = `${this.props.participantUUID}_${this.props.scorecardUUID}_${customIndicators.length + 1}.mp3`;            // Ex: abc123def_277403_2.mp3
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

    this.recorder = new Recorder(this.filename, {format: 'mp3'});
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
        playSeconds: this.state.recordDuration,
      });
      this.props.finishRecord(this.recorder.fsPath);
    });
  };

  countPlaySeconds = () => {
    const _this = this;
    _this.playInterval = setInterval(() => {
      if (_this.audioPlayer != null) {
        _this.audioPlayer.sound.getCurrentTime((seconds, isPlaying) => {
          this.setState({playSeconds: Math.ceil(seconds)});
          if (Math.ceil(seconds) === _this.state.recordDuration) {
            clearInterval(_this.playInterval);
            setTimeout(() => {
              this.setState({isPlaying: false});
            }, 500)
          }
        })
      }
      else clearInterval(_this.playInterval);
    }, 1000);
  };

  handlePlaying = () => {
    if (this.audioPlayer === null)
      this.audioPlayer = new AudioPlayer(this.recorder.fsPath);
    else
      this.audioPlayer.handlePlay();

    this.setState({isPlaying: this.audioPlayer.playState === PLAYING});

    if (this.audioPlayer.playState === PLAYING)
      this.countPlaySeconds();
    else if (this.audioPlayer.playState === PAUSED && this.playInterval)
      clearInterval(this.playInterval);
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
    const { translations } = this.context;

    return (
      <View>
        <View style={{alignItems: 'center'}}>
          {this.state.isRecording && this.renderRecordTime()}
        </View>
        <Tooltip
          isVisible={this.state.toolTipVisible}
          content={<Text>{ translations.pleasePressAndHoldTheButtonToRecordAudio }</Text>}
          placement="top"
          onClose={() => this.setState({ toolTipVisible: false })}
        >
          <TouchableOpacity
            onLongPress={() => this.recordVoice()}
            onPressOut={() => this.stopRecordVoice()}
            onPress={() => this.setState({ toolTipVisible: true })}
            style={styles.voiceRecordButton}>
            <MaterialIcon name="mic" size={35} color="#ffffff" />
          </TouchableOpacity>
        </Tooltip>
      </View>
    );
  };

  delete = () => {
    this.recorder.destroy();
    this.recorder =  null;
    if (this.audioPlayer != null)
      this.audioPlayer.release();

    this.audioPlayer = null;
    this.setState({
      isRecordButtonVisible: true,
      isRecording: false,
      isPlaying: false,
      recordDuration: 0,
      playSeconds: 0,
    });
    this.props.deleteAudio();
  };

  renderPlayIcon = () => {
    let iconName = this.state.isPlaying ? 'pause-circle-filled' : 'play-circle-filled';
    return (<MaterialIcon name={iconName} size={50} color={Color.primaryButtonColor} />)
  }

  renderRecordedVoice = () => {
    const {translations} = this.context;
    return (
      <View style={styles.recordedVoiceContainer}>
        <View style={{flexDirection: 'row', padding: 16, borderRadius: 8, backgroundColor: 'white'}}>
          <TouchableOpacity onPress={() => this.handlePlaying()}>
            {this.renderPlayIcon()}
          </TouchableOpacity>
          <View style={{marginLeft: 15, justifyContent: 'center', flex: 1}}>
            <Text>{translations['play']}</Text>
            <Text>{this.getCurrentTime(this.state.playSeconds)}</Text>
          </View>
          <TouchableOpacity onPress={() => this.delete()} style={{alignSelf: 'center'}}>
            <MaterialIcon name="delete" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {translations} = this.context;
    return (
      <View>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 16, color: '#3a3a3a'}}>
            {translations['enterNewCriteriaAsVoice']}
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