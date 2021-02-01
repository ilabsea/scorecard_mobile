import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import pkg from '../../../package';

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
        <Text style={styles.logoTitle}>គាំទ្រមូលនិធិដោយ / Funded by</Text>
        <TouchableOpacity onPress={() => {Linking.openURL('https://eeas.europa.eu/delegations/cambodia_en')}}>
          <Image source={require('../../assets/images/home/eu.png')} style={{width: 125, height: 125, marginBottom: 50, marginTop: 10}} />
        </TouchableOpacity>

        <Text style={styles.logoTitle}>អនុវត្តដោយ / Implemented by</Text>
        <View style={{flexDirection: 'row', marginTop: 14}}>
          { logos.map((logo, index) => this.buildLogo(logo, index)) }
        </View>

        <View style={{alignSelf: 'flex-end', justifyContent: 'flex-end', marginTop: 26}}>
          <Text style={{textAlign: 'center', marginTop: 10}}>{translations.version} { pkg.version }</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>ប័ណ្ណដាក់ពិន្ទុសហគមន៍</Text>
          <Text style={[styles.title, {marginTop: 5, fontSize: 20}]}>Community Scorecard</Text>

          <Text style={{marginTop: 50, textAlign: 'center'}}>
            កម្មវិធីប័ណ្ណដាក់ពិន្ទុឌីជីថល ត្រូវបានបង្កើតឡើងដោយមានការគាំទ្រមូលនិធិពីសហភាពអឺរ៉ុប អនុវត្តដោយអង្គការឃែរកម្ពុជា
            វិទ្យាស្ថានគោលនយោបាយនិងតស៊ូមតិ និងអង្គការ InSTEDD នៃគម្រោង “គាំទ្រការចូលរួមរបស់ប្រជាពលរដ្ឋប្រកបដោយអត្ថន័យតាមរយៈការប្រើប្រាស់បច្ចេកវិទ្យាឌីជីថល
            ដើម្បីធ្វើឱ្យប្រសើរឡើងនូវគណនេយ្យភាពសង្គម (Ref: ISAF-II)“។ ប្រជាពលរដ្ឋ អង្គការដៃគូ និងមន្រ្តីរដ្ឋាភិបាលប្រើប្រាស់កម្មវិធីនេះដើម្បីលើកកម្ពស់ការចូលរួម និងកិច្ចជជែកពិភាក្សារបស់ពួកគេ ក្នុងការធ្វើឱ្យប្រសើរឡើងនូវសេវាសាធារណៈ។
          </Text>
          <Text style={{marginTop: 20, textAlign: 'center'}}>
            The digitised scorecard app development is funded by the EU, implemented by CARE,
            API and InSTEDD iLab SEA under the project “supports civic engagement and improves
            social accountability by leveraging digital technologies (Re: ISAF-II)“.
            The community members, local NGO partners and governmental officials use the app to
            enhance their participation and dialogue with regards to public services improvement.
          </Text>

          { this.renderLogos() }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 22
  },
  logoTitle: {
    fontSize: 18,
    fontFamily: FontFamily.body
  },
  title: {
    fontSize: 25,
    fontFamily: FontFamily.title,
    marginTop: 30,
    textAlign: 'center',
  }
});

export default About;