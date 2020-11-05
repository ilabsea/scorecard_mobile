import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';

import {LocalizationContext} from '../components/Translations';
import Color from '../themes/color';

class HeaderTitle extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
  }

  render() {
    const {translations} = this.context;
    const {headline, subheading} = this.props;

    return (
      <View>
        <Text style={styles.headline}>
          {translations[headline]}
        </Text>
        <Subheading style={{color: 'gray'}}>
          {translations[subheading]}
        </Subheading>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headline: {
    color: Color.primaryColor,
    fontSize: 25,
    fontWeight: '700',
  },
});

export default HeaderTitle;