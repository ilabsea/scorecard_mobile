import {Player} from '@react-native-community/audio-toolkit';
class AudioPlayer {
  // audioFile must contain file path + filename
  constructor(audioFile) {
    this.audioFile = audioFile;
    this.player = new Player(audioFile)
  }

  playPause = () => {
    this.player.playPause();
  }

  destroy = () => {
    this.player.destroy();
  }

  stop = () => {
    this.player.stop();
  }
}

export default AudioPlayer;