import React from 'react';
import { View, Dimensions } from 'react-native';
import YouTube from 'react-native-youtube';

import { LocalizationContext } from '../../components/Translations';
import { environment } from '../../config/environment';
import NavigationHeader from '../../components/NavigationHeader';
import { navigationRef } from '../../navigators/app_navigator';
import internetConnectionService from '../../services/internet_connection_service';

class VideoPlayer extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.state = {
      hasInternet: false,
    }
    this.playerRef = React.createRef();
    this.isComponnetUnmount = false;
  }

  componentDidMount() {
    this.unsubscribeNetInfo = internetConnectionService.watchConnection((hasConnection) => {
      if (!this.isComponnetUnmount) {
        this.setState({ hasInternet: hasConnection });
        !hasConnection && internetConnectionService.showAlertMessage(this.context.translations.noInternetConnection);
      }
    });
  }

  componentWillUnmount() {
    this.isComponnetUnmount = true;
    this.unsubscribeNetInfo && this.unsubscribeNetInfo();
  }

  goBack() {
    navigationRef.current?.reset({ index: 1, routes: [
      { name: 'Home' },
      { name: 'Setting' }
    ]});
  }

  renderVideoPlayer() {
    if (this.state.hasInternet)
      return <YouTube
              apiKey={environment.youtubeApiKey}
              style={{ height: '50%', width: Dimensions.get('window').width }}
              ref={this.playerRef}
              play={true}
              videoId={this.props.route.params.video_id}
              resumePlayAndroid={true}
              onError={error => console.log('on play video error = ', error)}
            />
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationHeader title={ this.props.route.params.title } onBackPress={() => this.goBack()} />
        <View style={{ backgroundColor: '#000', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          { this.renderVideoPlayer() }
        </View>
      </View>
    )
  }
}

export default VideoPlayer;