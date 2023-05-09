import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AudioCardView from 'react-native-audio-card-view';

import CustomAudioPlayerButton from './CustomAudioPlayerButton';
import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import {bodyFontSize} from '../../utils/font_size_util';
import cardItemTabletStyles from '../../styles/tablet/ProposedIndicatorCardComponentStyle';
import cardItemMobileStyles from '../../styles/mobile/ProposedIndicatorCardComponentStyle';

const styles = getDeviceStyle(cardItemTabletStyles, cardItemMobileStyles);

class CustomAudioCard extends React.Component {
  renderCardLabel = () => {
    return <View style={styles.indicatorOutlinedLabelContainer}>
              { !!this.props.customTitle ? this.props.customTitle : <Text numberOfLines={2} style={[{fontSize: bodyFontSize(), marginTop: 10}, this.props.titleStyle]}>{this.props.title}</Text> }
              { this.props.subtitle && <Text style={[styles.subLabel, {color: Color.lightGrayColor}, this.props.subtitleStyle]}>{this.props.subtitle}</Text> }
           </View>
  }

  render() {
    return (
      <AudioCardView
        audioPosition='top-left'
        containerStyle={[customStyles.container, this.props.isOutlined && customStyles.outlined, this.props.containerStyle]}
        subtitleStyle={styles.subLabel}
        customIconSet={{play: 'play-circle', pause: 'pause-circle', mute: 'repeat'}}
        primaryColor={Color.clickableColor}
        onPress={() => !!this.props.onPressItem && this.props.onPressItem()}
        onLongPress={() => !!this.props.onLongPress && this.props.onLongPress()}
        hideAudioPlayer={true}
        allowFlexibleHeight={true}
      >
        <CustomAudioPlayerButton
          audio={this.props.audio}
          itemUuid={this.props.itemUuid}
          playingUuid={this.props.playingUuid}
          updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
          buttonStyle={{position: 'absolute', top: -26, left: 0, backgroundColor: 'white', elevation: 2, zIndex: 5}}
          useSmallIcon={true}
          isPlayIcon={true}
        />
        {this.renderCardLabel()}
        { !!this.props.badge && this.props.badge }
      </AudioCardView>
    )
  }
}

const customStyles = StyleSheet.create({
  container: {
    marginBottom: 10, 
    marginTop: 26,
    width: '100%',
  },
  outlined: {
    borderColor: Color.lightGrayColor,
    borderWidth: 1,
    elevation: 0,
  }
})

export default CustomAudioCard