import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from "native-base";
import {ProgressBar} from 'react-native-paper';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';
import { getBottomButtonFontSize, getResponsiveSize } from '../../utils/responsive_util';

class DownloadButton extends Component {
  render() {
    return (
      <View>
        { this.props.showDownloadProgress &&
          <View>
            <Text style={styles.downloadPercentageLabel}>{Math.ceil(this.props.downloadProgress * 100)}%</Text>
            <ProgressBar progress={this.props.downloadProgress} color={Color.headerColor} style={styles.progressBar}
              visible={this.props.showDownloadProgress}
            />
          </View>
        }

        <Button full bordered iconRight primary
          {...this.props}
          style={[CustomStyle.bottomButton, this.props.disabled ? {borderColor: 'gray'} : {}]}>

          <View style={{width: 60}} />
          <Text style={[styles.buttonLabelStyle, this.props.disabled ? {color: 'gray'} : {color: '#E2762D'}]}>
            {this.props.label}
          </Text>
          <View style={{width: 60, alignItems: 'flex-end'}}>
            <Icon name="download" style={[{ fontSize: getResponsiveSize(28, 24), marginRight: 0}, this.props.disabled ? {color: 'gray'} : {}]} />
          </View>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  downloadPercentageLabel: {
    textAlign: 'center',
    zIndex: 1,
    marginTop: 4,
    left: '48%',
    position: 'absolute',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 30,
    backgroundColor: '#e6e7e9',
    marginBottom: 20,
  },
  buttonLabelStyle: {
    textTransform: 'uppercase',
    fontSize: getBottomButtonFontSize(),
    flex: 1,
    textAlign: 'center',
  },
});

export default DownloadButton;