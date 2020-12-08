import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Sound from 'react-native-sound';
import Color from '../../themes/color';
import { Icon } from 'native-base';

export default class PlaySound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playState: 'pause'
    };
  }

  componentWillUnmount() {
    if (this.sound) {
      this.sound.release();
    }
  }

  playComplete = (success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }

    this.setState({playState: 'pause'});
  }

  playAudio() {
    if (!this.props.filePath) {
      return;
    }

    Sound.setCategory('Playback');
    let folder = this.props.isLocal ? Sound.MAIN_BUNDLE : '';

    this.sound = new Sound(this.props.filePath, folder, (error) => {
      if (error) { return console.log('failed to load the sound', error); }

      this.setState({playState: 'playing'});
      this.sound.play(this.playComplete);
    });
  }

  render() {
    let iconName = this.state.playState == 'playing' ? 'pause' : 'volume-medium';

    return (
      <TouchableOpacity
        onPress={() => this.playAudio()}
        style={styles.btnAudio}>

        <Icon name={iconName} style={{ color: '#fff'}}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btnAudio: {
    width: 36,
    height: 36,
    backgroundColor: Color.headerColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18
  }
});
