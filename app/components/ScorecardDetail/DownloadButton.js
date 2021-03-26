import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from "native-base";
import {ProgressBar} from 'react-native-paper';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';

import { getDeviceStyle } from '../../utils/responsive_util';
import DownloadButtonTabletStyles from './styles/tablet/DownloadButtonStyle';
import DownloadButtonMobileStyles from './styles/mobile/DownloadButtonStyle';

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

        <Button iconRight full bordered primary
          {...this.props}
          style={[CustomStyle.bottomButton, responsiveStyles.button, this.props.disabled ? {borderColor: 'gray'} : {}]}>

          <Text style={[styles.buttonLabel, responsiveStyles.buttonLabel, this.props.disabled ? {color: 'gray'} : {color: '#E2762D'}]}>
            {this.props.label}
          </Text>
          <Icon name="download" style={[{right: 0, position: 'absolute'}, responsiveStyles.icon, this.props.disabled ? {color: 'gray'} : {}]} />
        </Button>
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
    backgroundColor: '#e6e7e9',
  },
  buttonLabel: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default DownloadButton;