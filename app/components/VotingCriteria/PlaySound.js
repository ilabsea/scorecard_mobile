import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Sound from 'react-native-sound';
import Color from '../../themes/color';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import {setRatingScaleAudioStatus} from '../../actions/ratingScaleAction';
import {PLAYING, PAUSED} from '../../utils/variable';

class PlaySound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playState: 'pause'
    };
  }

  componentWillReceiveProps(props) {
    this.setState({playState: 'pause'});
  }

  componentWillUnmount() {
    if (this.sound) this.sound.release();
    if (global.sound) global.sound.release();
    this.props.setRatingScaleAudioStatus(PAUSED);
  }

  playComplete = (success) => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }

    this.setState({playState: 'pause'});
    this.props.setRatingScaleAudioStatus(PAUSED);
  }

  playAudio() {
    if (this.props.onPress)
      this.props.onPress();

    if (!this.props.filePath) {
      return;
    }

    Sound.setCategory('Playback');
    let folder = this.props.isLocal ? Sound.MAIN_BUNDLE : '';

    this.props.setRatingScaleAudioStatus(PLAYING);
    if (this.sound != null) {
      this.sound.release();
      this.sound = null;
      this.setState({playState: 'pause'});
      this.props.setRatingScaleAudioStatus(PAUSED);
    }
    else {
      this.sound = new Sound(this.props.filePath, folder, (error) => {
        if (error) { return console.log('failed to load the sound', error); }

        if (global.sound)
          global.sound.release();

        this.setState({playState: 'playing'});
        this.sound.play(this.playComplete);
        global.sound = this.sound;
      });
    }
  }

  render() {
    const { children, containerStyle } = this.props;
    let iconName = this.state.playState == 'playing' ? 'pause' : 'volume-medium';

    return (
      <TouchableOpacity
        onPress={() => this.playAudio() }
        style={[styles.btnAudio, containerStyle]}>

        { children }
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

function mapStateToProps(state) {
  return {
    ratingScaleAudio: state.ratingScaleAudioReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRatingScaleAudioStatus: (status) => dispatch(setRatingScaleAudioStatus(status)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaySound);