import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ProgressBar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';

import { getDeviceStyle } from '../../utils/responsive_util';
import DownloadButtonTabletStyles from '../../styles/tablet/DownloadButtonComponentStyle';
import DownloadButtonMobileStyles from '../../styles/mobile/DownloadButtonComponentStyle';

const responsiveStyles = getDeviceStyle(DownloadButtonTabletStyles, DownloadButtonMobileStyles);

class DownloadButton extends Component {
  render() {
    return (
      <View>
        { this.props.showDownloadProgress &&
          <View>
            <Text style={[styles.downloadPercentageLabel, responsiveStyles.downloadPercentageLabel]}>{Math.ceil(this.props.downloadProgress * 100)}%</Text>
            <ProgressBar progress={this.props.downloadProgress} color={Color.headerColor} style={[styles.progressBar, responsiveStyles.progressBar]}
              visible={this.props.showDownloadProgress}
            />
          </View>
        }

        <TouchableOpacity
          {...this.props}
          style={[CustomStyle.bottomButton, responsiveStyles.button, this.props.disabled ? {borderColor: Color.disabledBtnBg} : {}]}
        >
          <Text style={[styles.buttonLabel, responsiveStyles.buttonLabel, this.props.disabled ? {color: Color.disabledBtnBg} : {color: Color.clickableColor}]}>
            {this.props.label}
          </Text>
          <Icon name="download" style={[{right: 6, position: 'absolute'}, responsiveStyles.icon, this.props.disabled ? {color: Color.disabledBtnBg} : {color: Color.clickableColor}]} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  downloadPercentageLabel: {
    textAlign: 'center',
    zIndex: 1,
    left: '48%',
    position: 'absolute',
    fontWeight: 'bold',
  },
  progressBar: {
    backgroundColor: Color.paleGrayColor,
  },
  buttonLabel: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default DownloadButton;