import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import CloseButton from '../CloseButton';

import { LocalizationContext } from '../Translations';

class ErrorEndpointContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return (
      <View>
        <Text style={styles.title}>{translations.scorecardDownloadFailed}</Text>
        <Text style={{marginTop: 10}}>
          {translations.cscAppCannotReachTheServerAt} <Text style={{color: 'blue'}}>{this.props.backendUrl}</Text>.
          {translations.didYouEnterTheUrlCorrectly}
          {translations.ifYouKeepHavingThisProblem}
        </Text>

        <View style={styles.btnWrapper}>
          <CloseButton onPress={this.props.onDismiss} label={translations.close} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: FontFamily.title,
    marginBottom: 20,
  },
  btnWrapper: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});

export default ErrorEndpointContent;