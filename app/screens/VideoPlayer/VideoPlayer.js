import React from 'react';
import { View, Dimensions } from 'react-native';
import YouTube from 'react-native-youtube';

import { environment } from '../../config/environment';
import NavigationHeader from '../../components/NavigationHeader';
import { navigationRef } from '../../navigators/app_navigator';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLandscapeView: false,
    }
    this.playerRef = React.createRef();
    this.isComponnetUnmount = false;
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      let isLandscapeView = false;
      if (Dimensions.get('window').width > Dimensions.get('window').height)
        isLandscapeView = true;
      else
        isLandscapeView = false;

      if (!this.isComponnetUnmount)
        this.setState({ isLandscapeView });
    });
  }

  componentWillUnmount() {
    this.isComponnetUnmount = true;
  }

  goBack() {
    navigationRef.current?.reset({ index: 1, routes: [
      { name: 'Home' },
      { name: 'Setting' }
    ]});
  }

  render() {
    const { width } = Dimensions.get('window');

    return (
      <View style={{flex: 1}}>
        <NavigationHeader title={ this.props.route.params.title } onBackPress={() => this.goBack()} />
        <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <YouTube
            apiKey={environment.youtubeApiKey}
            style={{ height: '50%', width: width }}
            ref={this.playerRef}
            play={true}
            videoId={this.props.route.params.video_id}
            resumePlayAndroid={true}
            fullscreen={this.state.isLandscapeView}
            onError={(error) => console.log('on play video error = ', error)}
          />
        </View>
      </View>
    )
  }
}

export default VideoPlayer;