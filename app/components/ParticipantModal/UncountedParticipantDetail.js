import React from 'react';
import {View, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import BottomSheetInfoTitle from '../Share/BottomSheetInfoTitle';

import Color from '../../themes/color';
import { uncoutnedParticipantDetailContentHeight } from '../../constants/modal_constant';
import { containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import uuidv4 from '../../utils/uuidv4'

class UncountedParticipantDetail extends React.Component {
  static contextType = LocalizationContext;

  renderDetails() {
    const { translations } = this.context;
    const details = {
      'uncountedParticipantCan': ['proposeTheIndicator', 'addNewIndicator'],
      'uncountedParticipantCannot': ['votingTheIndicator']
    }

    let doms = [];
    for (let key in details) {
      doms.push(
        <View key={uuidv4()} style={{marginTop: 15}}>
          <Text style={{fontSize: bodyFontSize()}}>{ translations[key] }:</Text>
          {
            details[key].map(detail => {
              return (
                <View key={uuidv4()} style={{marginLeft: 10, flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{width: 6, height: 6, borderRadius: 6, backgroundColor: Color.blackColor, marginRight: 5}} />
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
      <View style={{backgroundColor: Color.whiteColor, height: hp(uncoutnedParticipantDetailContentHeight)}}>
        <BottomSheetInfoTitle title={this.context.translations.uncountedParticipant}
          customContainerStyle={{marginTop: -6}}
        />

        <View style={{padding: containerPadding, paddingHorizontal: containerPadding + 5, flex: 1}}>
          <Text style={{fontSize: bodyFontSize(), marginTop: 5}}>
            { this.context.translations.uncountedParticipantDetail }
          </Text>
          { this.renderDetails() }
        </View>
      </View>
    );
  }
}

export default UncountedParticipantDetail;