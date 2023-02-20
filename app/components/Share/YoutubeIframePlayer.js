import React from 'react';
import {ActivityIndicator, View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from '@react-native-community/netinfo';

import {LocalizationContext} from '../../components/Translations';
import color from '../../themes/color';
import {bodyFontSize} from '../../utils/font_size_util';
import {getDeviceStyle} from '../../utils/responsive_util';

class YoutubeIFramePlayer extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
      isLoading: true,
      hasInternet: true
    }
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      if (this.state.hasInternet != (state.isConnected && state.isInternetReachable))
        this.setState({hasInternet: state.isConnected && state.isInternetReachable})
    });
  }

  renderWarningMessage() {
    const {translations} = this.context;
    const error = !this.props.videoId ? { message: translations['noVideoAvailable'], icon: 'video-off-outline' } : { message: translations['noInternetConnectionToPlayVideo'], icon: 'wifi-off' }

    return (
      <View style={{borderWidth: 0, alignItems: 'center', marginTop: -26}}>
        <Icon name={error.icon} size={getDeviceStyle(50, 38)} color={color.lightGrayColor} />
        <Text style={{color: color.lightGrayColor, marginTop: 6, fontSize: bodyFontSize()}}>{error.message}</Text>
      </View>
    )
  }

  renderVideoPlayer() {
    return <React.Fragment>
              { this.state.isLoading && <ActivityIndicator size="large" color={color.primaryColor} style={{position: 'absolute'}} /> }
              <TouchableOpacity onPress={() => this.setState({isPlaying: !this.state.isPlaying})} style={[styles.touchableContainer, this.props.touchableContainerStyle]} />
              { !this.state.isPlaying && <Icon name='play-circle-outline' size={80} color="rgba(255,255,255,0.7)" style={{position:'absolute', zIndex: 1}} /> }
              <YoutubePlayer
                height={'100%'}
                width={'100%'}
                play={this.state.isPlaying}
                videoId={this.props.videoId}
                onReady={() => this.setState({isLoading: false})}
                initialPlayerParams={{ controls: false, rel: false }}
              />
           </React.Fragment>
  }

  render() {
    return (
      <View style={[{height: this.props.height, width: this.props.width, alignItems: 'center', justifyContent: 'center'}, this.props.containerStyle]}>
        { !this.state.hasInternet || !this.props.videoId ? this.renderWarningMessage() : this.renderVideoPlayer() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  touchableContainer: {
    position: 'absolute',
    height: 310,
    width: '100%',
    zIndex: 2
  }
});

export default YoutubeIFramePlayer;