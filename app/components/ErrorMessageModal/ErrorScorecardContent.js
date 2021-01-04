import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FontFamily } from '../../assets/stylesheets/theme/font';

import { LocalizationContext } from '../Translations';
import CloseButton from '../CloseButton';

class ErrorScorecardContent extends Component {
  static contextType = LocalizationContext;

  render() {
    const { translations } = this.context;

    return(
      <View>
        <Text style={styles.title}>{translations.scorecardNotFound}</Text>
        <Text style={{marginTop: 10}}>
          {translations.scorecardIsNotExist}
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

export default ErrorScorecardContent;