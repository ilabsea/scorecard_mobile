import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import Sound from 'react-native-sound';
import Color from '../../themes/color';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import {setRatingScaleAudioStatus} from '../../actions/ratingScaleAction';
import {PLAYING, PAUSED} from '../../utils/variable';
import votingCriteriaService from '../../services/votingCriteriaService';

import { getDeviceStyle } from '../../utils/responsive_util';

class PlaySound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playState: 'pause'
    };
  }

  async componentDidMount() {
    const isPlaying = await votingCriteriaService.isPlayingCriteria(this.props.position);
    if (isPlaying)
      this.setState({playState: 'playing'});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.playState == 'playing')
      this.setState({ playState: 'pause' });
  }

  componentWillUnmount() {
    if (this.sound) this.sound.release();
    if (global.sound) global.sound.release();
    this.props.setRatingScaleAudioStatus(PAUSED);

    this.setState = (state, callback) => {
      return;
    };
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
    !!this.props.onPress && this.props.onPress();

    if (!this.props.filePath) {
      return;
    }

    this.sound = null;
    Sound.setCategory('Playback');
    let folder = this.props.isLocal ? Sound.MAIN_BUNDLE : '';

    votingCriteriaService.clearPlayingCriteria();
    this.props.setRatingScaleAudioStatus(PAUSED);

    if (global.sound)
      global.sound.release();

    if (this.state.playState === 'playing') {
      this.setState({playState: 'pause'});
      return;
    }

    this.props.setRatingScaleAudioStatus(PLAYING);

    this.sound = new Sound(this.props.filePath, folder, (error) => {
      if (error) { return console.log('failed to load the sound', error); }

      if (global.sound)
        global.sound.release();

      this.setState({playState: 'playing'});
      this.sound.play(this.playComplete);
      global.sound = this.sound;
    });

    if (this.props.onSavePlayingAudio)
      this.props.onSavePlayingAudio();
  }

  getIconName() {
    if (!this.props.filePath) {
      return 'volume-mute';
    }

    return this.state.playState == 'playing' ? 'pause' : 'volume-medium';
  }

  render() {
    const iconSize = getDeviceStyle(28, 20);
    const btnBg = !!this.props.filePath ? Color.headerColor : Color.paleBlackColor;
    const btnStyles = [styles.btnAudio, { backgroundColor: btnBg }];

    return (
      <TouchableOpacity
        onPress={() => this.playAudio()}
        style={[!this.props.isHeader ? btnStyles : {}, this.props.containerStyle]}
      >
        { this.props.children }

        <View style={this.props.isHeader ? btnStyles : {}}>
          <Icon name={this.getIconName()} style={[{ color: Color.whiteColor, fontSize: iconSize}, this.getIconName() == 'pause' ? {marginLeft: 1} : {}]}/>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btnAudio: {
    width: getDeviceStyle(36, 30),
    height: getDeviceStyle(36, 30),
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
