import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import PressableLabel from '../Share/PressableLabel';

import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import { getProposedIndicatorVideoId } from '../../utils/proposed_indicator_util';
import { pressableItemSize } from '../../utils/component_util';

class ProposedIndicatorMethodDetailsMain extends React.Component {
  static contextType = LocalizationContext;

  showVideoPlayer() {
    const videoId = getProposedIndicatorVideoId(this.props.proposeMethod.value);

    Linking.canOpenURL('vnd.youtube://shorts/' + videoId).then(supported => {
      if (supported)
        return Linking.openURL('vnd.youtube://shorts/' + videoId);
      else
        return Linking.openURL('https://www.youtube.com/shorts/' + videoId);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{padding: containerPadding, paddingBottom: 15}}>
          <Text style={{fontSize: bodyFontSize()}}>
            { this.props.proposeMethod.description }
          </Text>

          <TouchableOpacity onPress={() => this.showVideoPlayer()} style={styles.btnShowVideo}>
            <Icon name='play-circle-filled' size={20} color={Color.clickableColor} style={styles.playVideoIcon} />
            <PressableLabel label={this.context.translations.clickHereToWatchHowToProposeIndicator} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.accordionContentBgColor,
    borderColor: Color.paleGrayColor,
    borderWidth: 1
  },
  btnShowVideo: {
    flexDirection: 'row',
    marginTop: getDeviceStyle(20, 15),
    height: pressableItemSize(),
    alignItems: 'center'
  },
  playVideoIcon: {
    padding: 0,
    marginRight: 5,
    marginTop: -4,
    height: 20
  }
});

export default ProposedIndicatorMethodDetailsMain;