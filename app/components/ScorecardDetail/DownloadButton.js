import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Icon} from "native-base";
import {ProgressBar} from 'react-native-paper';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';

import {LocalizationContext} from '../Translations';

class DownloadButton extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

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

          <Text style={[styles.buttonLabelStyle, this.props.disabled ? {color: 'gray'} : {color: '#E2762D'}]}>
            {translations["downloadAndSave"]}
          </Text>
          <Icon name="download" style={{right: 0, position: 'absolute'}} />
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
    fontSize: 18,
  },
});

export default DownloadButton;