import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LocalizationContext } from '../../components/Translations';

import pkg from '../../../package';

import { getDeviceStyle, isShortWidthScreen } from '../../utils/responsive_util';
import AboutTabletStyles from '../../styles/tablet/AboutScreenStyle';
import AboutMobileStyles from '../../styles/mobile/AboutScreenStyle';

const styles = getDeviceStyle(AboutTabletStyles, AboutMobileStyles);

class About extends Component {
  static contextType = LocalizationContext;

  buildLogo(logo, index) {
    let mobileHeight = isShortWidthScreen() ? wp('18%') : wp('15%');
    let height = getDeviceStyle(50, mobileHeight);
    let ratio = getDeviceStyle(44, wp('11.5%'))
    let width = (logo.width * ratio)/height;
    const logoMargin = getDeviceStyle(10, 4);

    return (
      <TouchableOpacity style={{borderRadius: 30, padding: 6, borderWidth: 0}} key={index}
        onPress={() => Linking.openURL(logo.url)}
      >
        <Image source={logo.source} style={[{width: width, height: height, marginHorizontal: logoMargin}, logo.style]} resizeMode="contain" />
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
      <View style={styles.logoContainer}>
        <Text style={styles.logoTitle}>គាំទ្រមូលនិធិដោយ / Funded by</Text>
        <TouchableOpacity onPress={() => {Linking.openURL('https://eeas.europa.eu/delegations/cambodia_en')}}>
          <Image source={require('../../assets/images/home/eu.png')} style={styles.euLogo} />
        </TouchableOpacity>

        <Text style={styles.logoTitle}>អនុវត្តដោយ / Implemented by</Text>
        <View style={styles.implementedLogoContainer}>
          { logos.map((logo, index) => this.buildLogo(logo, index)) }
        </View>

        <View style={{alignSelf: 'flex-end', justifyContent: 'flex-end', marginTop: 26}}>
          <Text style={styles.versionText}>{translations.version} { pkg.version }</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flexGrow: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>ប័ណ្ណដាក់ពិន្ទុសហគមន៍</Text>
            <Text style={[styles.title, styles.englishTitle]}>Community Scorecard</Text>

            <Text style={styles.khmerText}>
              កម្មវិធីប័ណ្ណដាក់ពិន្ទុឌីជីថល ត្រូវបានបង្កើតឡើងដោយមានការគាំទ្រមូលនិធិពីសហភាពអឺរ៉ុប អនុវត្តដោយអង្គការឃែរកម្ពុជា
              វិទ្យាស្ថានគោលនយោបាយនិងតស៊ូមតិ និងអង្គការ InSTEDD នៃគម្រោង “គាំទ្រការចូលរួមរបស់ប្រជាពលរដ្ឋប្រកបដោយអត្ថន័យតាមរយៈការប្រើប្រាស់បច្ចេកវិទ្យាឌីជីថល
              ដើម្បីធ្វើឱ្យប្រសើរឡើងនូវគណនេយ្យភាពសង្គម (Ref: ISAF-II)“។ ប្រជាពលរដ្ឋ អង្គការដៃគូ និងមន្រ្តីរដ្ឋាភិបាលប្រើប្រាស់កម្មវិធីនេះដើម្បីលើកកម្ពស់ការចូលរួម និងកិច្ចជជែកពិភាក្សារបស់ពួកគេ ក្នុងការធ្វើឱ្យប្រសើរឡើងនូវសេវាសាធារណៈ។
            </Text>
            <Text style={styles.englishText}>
              The digitised scorecard app development is funded by the EU, implemented by CARE,
              API and InSTEDD iLab Southeast Asia under the project “Supporting meaningful civic engagement and improved
              social accountability by leveraging digital technologies (Re: ISAF-II)“.
              The community members, local NGO partners and governmental officials use the app to
              enhance their participation and dialogue with regards to public services improvement.
            </Text>

            { this.renderLogos() }
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default About;