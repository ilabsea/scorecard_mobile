import React, {Component} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import Sound from 'react-native-nitro-sound';

import {LocalizationContext} from '../Translations';
import RecordedAudioCard from './RecordedAudioCard';
import RecordAudioButton from './RecordAudioButton';
import AudioPlayer from '../../services/audio_player_service';
import {PLAYING, PAUSED} from '../../constants/indicator_constant';
import { bodyFontSize } from '../../utils/font_size_util';
import uuidv4 from '../../utils/uuidv4';
import { getAudioPath } from '../../utils/file_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

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
      isAudioEdited: false,
    };
    this.isComponentUnmount = false;
  }

  componentDidMount() {
    this.checkPermission();
    this.filename = `${this.props.scorecardUuid}_${uuidv4()}.mp3`;                // Ex: 24595e3a-9054-4767-9a63-881be34a2b56_277403.mp3
  }

  componentDidUpdate() {
    // Allow to update the state (in componentDidUpdate) only when the component is not unmount and the audio is not edited yet (by remove or record new audio)
    // and the audioPlayer must be null and the custom indicator needs to have audio file (this.props.audioFilePath)
    if (!this.isComponentUnmount && !this.state.isAudioEdited && !this.audioPlayer && this.props.audioFilePath) {
      this.audioPlayer = new AudioPlayer(this.props.audioFilePath, false);
      setTimeout(() => {
        this.setState({
          isRecordButtonVisible: false,
          playSeconds: this.audioPlayer.getDuration(),
          recordDuration: this.audioPlayer.getDuration(),
        });
      }, 250);
    }
  }

  componentWillUnmount() {
    this.isComponentUnmount = true;
    this.audioPlayer && this.audioPlayer.release();
  }

  checkPermission = () => {
    const rationale = {
      'title': 'Microphone Permission',
      'message': 'This mobile app require your microphone permission in order to be able to record the voice.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {this.setState({hasPermission: (result === true || result === PermissionsAndroid.RESULTS.GRANTED)});});
  }

  recordVoice = async () => {
    if (!this.state.hasPermission) return;

    this.setState({ isAudioEdited: true });
    this.recorder = await Sound.startRecorder(
      getAudioPath(this.filename)
    );
    this.setState({isRecording: true});
    this.recorderInterval = setInterval(() => {
      this.setState({recordDuration: this.state.recordDuration + 1});
    }, 1000);
  };

  stopRecordVoice = async () => {
    if (this.recorder === null) return;

    clearInterval(this.recorderInterval);
    this.recorder = await Sound.stopRecorder();
    console.log('=== recording stop = ', this.recorder);
    this.setState({
      isRecording: false,
      isRecordButtonVisible: false,
      playSeconds: this.state.recordDuration,
    });
    this.props.finishRecord(this.recorder);
  };

  countPlaySeconds = () => {
    const _this = this;
    _this.playInterval = setInterval(() => {
      if (_this.audioPlayer != null && !this.state.isComponentUnmount) {
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
      this.audioPlayer = new AudioPlayer(this.recorder, true);
    else if (this.audioPlayer && this.props.isEdit)
      this.audioPlayer.play();
    else
      this.audioPlayer.handlePlay();

    this.setState({isPlaying: this.audioPlayer.playState === PLAYING});

    if (this.audioPlayer.playState === PLAYING)
      this.countPlaySeconds();
    else if (this.audioPlayer.playState === PAUSED && this.playInterval)
      clearInterval(this.playInterval);
  };

  renderRecordButton = () => {
    return (
      <RecordAudioButton
        recordDuration={this.state.recordDuration}
        isRecording={this.state.isRecording}
        disabled={this.props.disabled}
        recordVoice={() => this.recordVoice()}
        stopRecordVoice={() => this.stopRecordVoice()}
      />
    )
  };

  delete = () => {
    if (this.recorder)
      this.recorder =  null;

    this.audioPlayer && this.audioPlayer.release();
    this.audioPlayer = null;
    this.setState({
      isRecordButtonVisible: true,
      isRecording: false,
      isPlaying: false,
      recordDuration: 0,
      playSeconds: 0,
      isAudioEdited: true,
    });
    this.props.deleteAudio();
  };

  renderRecordedAudio = () => {
    return (
      <RecordedAudioCard
        isPlaying={this.state.isPlaying}
        playSeconds={this.state.playSeconds}
        handlePlaying={() => this.handlePlaying()}
        delete={() => this.delete()}
      />
    )
  };

  render() {
    const {translations} = this.context;
    return (
      <View>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={{fontSize: bodyFontSize(), fontFamily: FontFamily.body, color: '#3a3a3a'}}>
            {translations.enterNewIndicatorAsVoice}
          </Text>
        </View>
        {this.state.isRecordButtonVisible && this.renderRecordButton()}
        {!this.state.isRecordButtonVisible && this.renderRecordedAudio()}
      </View>
    );
  }
}

export default VoiceRecord;