import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Linking, TouchableOpacity } from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

class About extends Component {
  static contextType = LocalizationContext;

  buildLogo(logo, index) {
    let height = 50;
    let width = (logo.width * 44)/height;

    return (
      <TouchableOpacity style={{borderRadius: 30, padding: 6, borderWidth: 0}} key={index}
        onPress={() => Linking.openURL(logo.url)}
      >
        <Image source={logo.source} style={[{width: width, height: height}, logo.style, { marginHorizontal: 10 }]} resizeMode="contain" />
      </TouchableOpacity>
    )
  }

  renderLogos = () => {
    const { translations } = this.context;

    let logos = [
      {
        source: require('../../assets/images/home/care.png'),
        width: 160,
        style: {},
        url: 'https://www.care-cambodia.org/',
      },
      {
        source: require('../../assets/images/home/api.png'),
        width: 75,
        style: {marginTop: -4},
        url: 'https://apiinstitute.org/',
      },
      {
        source: require('../../assets/images/home/instedd.png'),
        width: 160,
        style: {},
        url: 'http://ilabsoutheastasia.org',
      },
    ]

    return (
      <View style={{marginTop: 40, alignItems: 'center'}}>
        <Text style={styles.logoTitle}>{translations.fundedBy}</Text>
        <TouchableOpacity onPress={() => {Linking.openURL('https://eeas.europa.eu/delegations/cambodia_en')}}>
          <Image source={require('../../assets/images/home/eu.png')} style={{width: 125, height: 125, marginBottom: 50, marginTop: 10}} />
        </TouchableOpacity>

        <Text style={styles.logoTitle}>{translations.implementedBy}</Text>
        <View style={{flexDirection: 'row', marginTop: 14}}>
          { logos.map((logo, index) => this.buildLogo(logo, index)) }
        </View>
      </View>
    );
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 25, fontFamily: FontFamily.title, marginTop: 30}}>{ translations.community_scorecard }</Text>
        <Text style={{marginTop: 40}}>
          { translations.aboutDescription }
        </Text>

        { this.renderLogos() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logoTitle: {
    fontSize: 18,
    fontFamily: FontFamily.body
  }
});

export default About;