import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Divider } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import { getDeviceStyle } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';
import Images from '../../utils/images';
import ratings from '../../db/jsons/ratings';
import Scorecard from '../../models/Scorecard';
import indicatorHelper from '../../helpers/indicator_helper';
import LanguageRatingScale from '../../models/LanguageRatingScale';

const imageSize = 30;
const IndicatorList = (props) => {
  const scorecard = Scorecard.find(props.scorecardUuid);

  const renderRatingImage = (ratingScore) => {
    const imageName = ratings.filter(rating => rating.value == ratingScore)[0].image;
    const label = LanguageRatingScale.findByLanguageCodeAndRatingScaleId(scorecard.text_language_code, ratingScore);
    return (
      <View style={{width: 90, alignItems: 'center'}}>
        <Image source={Images[imageName]} style={styles.ratingImage} />
        <Text style={{fontSize: 12}}>{ratingScore} {label.content}</Text>
      </View>
    )
  }

  const renderIndicators = () => {
    return props.indicators.map((indicator, index) => {
      return (
        <React.Fragment key={`indicator-item-${index}`}>
          <View key={`indicator-${index}`} style={styles.container}>
            <Text style={[styles.label, {fontFamily: FontFamily.title}]}>{ indicator.order }.</Text>
            <Text numberOfLines={2} style={[styles.label, {flex: 1, marginHorizontal: 6,}]}>
              { indicatorHelper.getDisplayIndicator(indicator, scorecard).content }
            </Text>
            { renderRatingImage(indicator.ratingScore) }
          </View>
          <Divider key={`divider-${index}`} />
        </React.Fragment>
      )
    })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      { renderIndicators() }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  ratingImage: {
    width: imageSize,
    height: imageSize,
    alignSelf: 'center',
  },
  container: {
    flexDirection: 'row',
    height: getDeviceStyle(76, 70),
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  label: {
    fontSize: bodyFontSize()
  }
});

export default IndicatorList;