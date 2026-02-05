import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../../components/Translations';

import pkg from '../../../package';

import { getDeviceStyle, isShortWidthScreen } from '../../utils/responsive_util';
import AboutTabletStyles from '../../styles/tablet/AboutScreenStyle';
import AboutMobileStyles from '../../styles/mobile/AboutScreenStyle';
import { FontFamily } from '../../assets/stylesheets/theme';

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

  openEmailLink = async () => {
    let url = 'mailto:support@digital-csc.org';
    await Linking.openURL(url);
  };

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

    const newLogos1 = [
      {
        source: require('../../assets/images/ipa.png'),
        width: 160,
        style: {},
        url: 'https://www.care-cambodia.org/',
      },
      {
        source: require('../../assets/images/care_new.png'),
        width: 160,
        style: {marginLeft: 8},
        url: 'https://apiinstitute.org/',
      }
    ]

    const newLogos2 = [
      {
        source: require('../../assets/images/ycc.png'),
        width: 150,
        style: {},
        url: 'http://ilabsoutheastasia.org',
      },
      {
        source: require('../../assets/images/idea.jpg'),
        width: 140,
        style: {},
        url: 'http://ilabsoutheastasia.org',
      },
    ]

    return (
      <View style={styles.logoContainer}>
        <Text style={styles.logoTitle}>សម្រាប់ព៌តមានបន្ថែមសូមទាក់ទងមកយើងតាមរយៈ</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.logoTitle}>Contact us via </Text>
          <TouchableOpacity onPress={() => this.openEmailLink()}>
            <Text style={[styles.logoTitle, {color: '#4e73df'}]}>support@digital-csc.org</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.logoTitle, {marginTop: 22, fontFamily: FontFamily.title}]}>កំណែទី២ (ឆ្នាំ២០២៥)៖ សហការអនុវត្តដោយ</Text>
        <Text style={[styles.logoTitle, { fontFamily: FontFamily.title }]}>Version 2 (2025), Co-implemented by</Text>

        <Text style={[styles.logoTitle, {marginTop: 16}]}>គាំទ្រមូលនិធិដោយ / Funded by</Text>
        <Image source={require('../../assets/images/eu_new.png')} style={styles.newEuLogo} />

        <Text style={styles.logoTitle}>អនុវត្តដោយ / Implemented by</Text>
        {
          DeviceInfo.isTablet()
          ? <View style={styles.implementedLogoContainer}>
              { [...newLogos1, ...newLogos2].map((logo, index) => this.buildLogo(logo, index)) }
            </View>
          : <React.Fragment>
              <View style={styles.implementedLogoContainer}>
                { newLogos1.map((logo, index) => this.buildLogo(logo, index)) }
              </View>

              <View style={[styles.implementedLogoContainer, {marginTop: 8}]}>
                { newLogos2.map((logo, index) => this.buildLogo(logo, index)) }
              </View>
            </React.Fragment>
        }

        <Text style={[styles.logoTitle, {marginTop: 48, fontFamily: FontFamily.title}]}>កំណែទី១៖ សហការផលិតដោយ</Text>
        <Text style={[styles.logoTitle, {fontFamily: FontFamily.title}]}>Version 1, Co-produced by</Text>

        <Text style={[styles.logoTitle, {marginTop: 16}]}>គាំទ្រមូលនិធិដោយ / Funded by</Text>
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
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>ប័ណ្ណដាក់ពិន្ទុសហគមន៍</Text>
        <Text style={[styles.title, styles.englishTitle]}>Community Scorecard</Text>

        <Text style={styles.khmerText}>
          គម្រោង «ប្លាស្ទិកឆ្លាតវៃកម្ពុជា» គឺជាផ្នែកមួយនៃកម្មវិធី EU SWITCH-Asia ក្រោមជំនួយគាំទ្រពីសហភាពអឺរ៉ុប (European Union) និងមានការរួមចំណែកពីសហប្រតិបត្តិការអន្តរជាតិនៃប្រទេសអូទ្រីស (International Partnerships Austria)។
          គម្រោងនេះដឹកនាំដោយអង្គការឃែរអូទ្រីស (CARE Austria) និងអនុវត្តដោយ អង្គការឃែរកម្ពុជា (CARE Cambodia) ជាមួយដៃគូគម្រោងចំនួន ២ គឺ សមាគមប្រជាធិបតេយ្យឯករាជ្យ នៃសេដ្ឋកិច្ចក្រៅប្រព័ន្ធ (IDEA)
          និងក្រុមប្រឹក្សាយុវជនកម្ពុជា (YCC)។ គម្រោងនេះនឹងអនុវត្តរយៈពេល ៣ ឆ្នាំ (២០២៥-២០២៧) ក្នុងគោលបំណងកាត់បន្ថយការបំពុលដោយប្លាស្ទិក និងការបញ្ចេញឧស្ម័នផ្ទះកញ្ចក់ តាមរយៈការគាំទ្រ សហគ្រាសធនតូច និងមធ្យមក្នុងការប្រើប្រាស់ការវេចខ្ចប់ប្រកបដោយនិរន្តរភាព
          ការពង្រឹងប្រព័ន្ធការប្រមូលនិង ការគ្រប់គ្រងសំណល់រឹង និងការកែឆ្នៃសំណល់ប្លាស្ទិក (រួមបញ្ចូលទាំងភាគីពាក់ព័ន្ធក្នុង និងក្រៅប្រព័ន្ធ) ការបង្កើនការយល់ដឹងរបស់សាធារណជន និងការលើកកម្ពស់ហិរញ្ញប្បទានបៃតង។
        </Text>

        <Text style={styles.khmerText}>
          ប័ណ្ណដាក់ពិន្ទុសហគមន៍ឌីជីថល (DCSC) គឺជាដំណើរការគណនេយ្យភាពសង្គមមួយដែលត្រូវបានរចនាឡើងដើម្បី ពង្រឹងភាពជាដៃគូនិងលើកកម្ពស់សិទ្ធិអំណាចដល់ភាគីពាក់ព័ន្ធផ្សេងៗនៃគម្រោង «ប្លាស្ទិកឆ្លាតវៃកម្ពុជា»។
          វិធីសាស្រ្តនេះ មានគោលដៅកាត់បន្ថយផលប៉ះពាល់លើបរិស្ថាននិងការកាត់បន្ថយប្រើប្រាស់ផ្លាស្ទិចក្នុងការកែលម្អសេវាសាធារណៈនៅថ្នាក់ជាតិនិងថ្នាក់ក្រោមជាតិ។ គោលបំណងគឺដើម្បីបង្កើនអភិបាលកិច្ចនិងគាំទ្រដល់ការធ្វើផែនការផ្អែកលើទិន្នន័យនិង
          ភស្តុតាងជាក់ស្តែងដោយលើកកម្ពស់ការចូលរួមពីអាជ្ញាធរ សហគមន៍ និងរោងចក្រគោលដៅតាមរយៈយន្តការសន្ទនា បែបស្ថាបនាដ៏មានអត្ថន័យស្របទៅតាមសូចនាករសំខាន់ៗដែលមានផលប៉ះពាល់នៃគម្រោង «ប្លាស្ទិកឆ្លាតវៃកម្ពុជា»។
        </Text>

        <Text style={styles.khmerText}>
          ប័ណ្ណដាក់ពិន្ទុឌីជីថលដំណាក់កាលទី២ អនុវត្តដោយគម្រោង «ប្លាស្ទិកឆ្លាតវៃកម្ពុជា» នៃអង្គការឃែរកម្ពុជា គឺជាការ ធ្វើបច្ចុប្បន្នភាពទំនើបកម្ម កម្មវិធី «ប័ណ្ណដាក់ពិន្ទុឌីជីថល» ក្នុងគោលបំណងគាំទ្រនិងពង្រឹងការចូលរួមរបស់ប្រជាពលរដ្ឋ ប្រកបដោយអត្ថន័យតាមរយៈការប្រើប្រាស់បច្ចេកវិទ្យាឌីជីថលសំដៅជំរុញការអនុវត្តគណនេយ្យភាពសង្គមអោយមាន ប្រសិទ្ធភាព (Ref: ISAF Phase II - 2019-2024)” ដោយទទួលបានការគាំទ្រមូលនិធិពីសហភាពអឺរ៉ុប អនុវត្តដោយអង្គការឃែរកម្ពុជា វិទ្យាស្ថានគោលនយោបាយនិងតស៊ូមតិ និងអង្គការ InSTEDD។
        </Text>

        <Text style={styles.englishText}>
          PlasticSmart Cambodia is part of the EU SWITCH-Asia program, funded by the European Union (EU) with co-financing from
          Austrian Development Cooperation, led by CARE Austria and implemented by CARE Cambodia with 2 local implementation partners, namely
          Independent Democracy of Informal Economy Association (IDEA) and Youth Council Cambodia (YCC).​​​​ The project will beimplemented for
          three years (2025-2027) with the aim of reducing plastic pollution and greenhouse gas emissions by supporting small and medium enterprises (SME) in the
          use of sustainable packaging, strengthening the solid waste collection and management system and
          recycling (including stakeholders inside and outside the system), raising public awareness, and promoting green financing.
        </Text>

        <Text style={styles.englishText}>
          Digital Community Scorecard (DCSC) is a social accountability system designed to strengthen partnerships and empower various stakeholders of
          the PlasticSmart Cambodia Project. This methodology embeds environmental and plastic-reduction goals as cross-cutting themes in public service
          improvement at the national and sub-national levels. The objective is to enhance governance and support evidence-based planning by promoting
          participation from authorities, participating factories, and communities through the meaningful dialogue mechanism via impact indicators of the PlasticSmart Cambodia.
        </Text>

        <Text style={styles.englishText}>
          Digital Community Scorecard Phase II, implemented by PlasticSmart Cambodia, is an enhanced and updated version of the
          “Digital Community Scorecard” system developed by the project “Supporting meaningful civic engagement and improved social accountability
          by leveraging digital technologies (Re: ISAF Phase II - 2019-2024)”, which is funded by the European Union and implemented by
          CARE Cambodia, the Institute for Policy and Advocacy (API), and Innovative Support to Emergency, Diseases and Disasters (InSTEDD).
        </Text>

        { this.renderLogos() }
      </ScrollView>
    );
  }
}

export default About;