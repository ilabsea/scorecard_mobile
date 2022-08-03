import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import BottomSheetInfoTitle from '../Share/BottomSheetInfoTitle';

import Color from '../../themes/color';
import { anonymousParticipantDetailContentHeight } from '../../constants/modal_constant';
import { containerPadding, getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import uuidv4 from '../../utils/uuidv4'

class AnonymousParticipantDetail extends React.Component {
  static contextType = LocalizationContext;

  renderDetails() {
    const { translations } = this.context;
    const details = {
      'anonymousParticipantCan': ['proposeTheIndicator', 'addNewIndicator'],
      'anonymousParticipantCannot': ['votingTheIndicator']
    }

    let doms = [];
    for (let key in details) {
      doms.push(
        <View key={uuidv4()} style={{marginTop: 15}}>
          <Text style={{fontSize: bodyFontSize()}}>{ translations[key] }:</Text>
          {
            details[key].map(detail => {
              return (
                <View key={uuidv4()} style={{marginLeft: 15, flexDirection: 'row'}}>
                  <View style={styles.dot} />
                  <Text style={{ fontSize: bodyFontSize(), textTransform: 'lowercase' }}>{ translations[detail] }</Text>
                </View>
              )
            })
          }
        </View>
      )
    }

    return doms;
  }

  render() {
    return (
      <View style={styles.container}>
        <BottomSheetInfoTitle title={this.context.translations.anonymousParticipant}
          customContainerStyle={{marginTop: -6}}
        />

        <View style={styles.descriptionContainer}>
          <Text style={{fontSize: bodyFontSize(), marginTop: 5}}>
            { this.context.translations.anonymousParticipantDetail }
          </Text>
          { this.renderDetails() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    height: hp(anonymousParticipantDetailContentHeight)
  },
  descriptionContainer: {
    padding: containerPadding,
    paddingHorizontal: containerPadding + 5,
    flex: 1
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: Color.blackColor,
    marginRight: 5,
    marginTop: getDeviceStyle(11, 9)
  }
});

export default AnonymousParticipantDetail;