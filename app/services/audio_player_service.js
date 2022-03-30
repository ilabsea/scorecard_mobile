import Sound from 'react-native-sound';
import {PLAYING, PAUSED} from '../constants/indicator_constant';
class AudioPlayer {
  constructor(audioFile, isAutoPlay) {
    this.audioFile = audioFile;
    this.playState = PLAYING;
    this.playSeconds = 0;
    this.duration = 0;
    this.sound = new Sound(audioFile, '', (error) => {
      if (error) {return console.log('failed to load the sound ', error);}
      this.duration = Math.ceil(this.sound.getDuration());

      if (isAutoPlay)
        this.play();
    })
  }

  play = () => {
    this.playState = PLAYING;
    this.sound.play((success) => {
      if (success) console.log('successfully finished playing');
      else console.log('playback failed due to audio decoding errors');

      this.playState = PAUSED;
    });
  }

  pause = () => {
    this.playState = PAUSED
    this.sound.pause();
  }

  release = () => {
    this.playSeconds = 0;
    this.sound.release();
  }

  handlePlay = () => {
    if (this.playState === PAUSED) {
      this.play();
      return;
    }
    this.pause();
  }

  getDuration = () => {
    return this.duration;
  }
}

export default AudioPlayer;