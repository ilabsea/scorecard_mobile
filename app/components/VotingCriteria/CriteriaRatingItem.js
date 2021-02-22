import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { Divider} from 'react-native-paper';
import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import Color from '../../themes/color';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';
import ratings from '../../db/jsons/ratings';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import PlaySound from './PlaySound';
import indicatorHelper from '../../helpers/indicator_helper';
import votingCriteriaService from '../../services/votingCriteriaService';

const iconSize = 80;
const iconWrapperSize = 98;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
console.log("windowWidth", windowWidth);

export default class CriteriaRatingItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard = realm.objects('Scorecard').filtered(`uuid='${props.criteria.scorecard_uuid}'`)[0];

    this.state = {
      currentScore: 0,
      languageRatingScales: [],
      scorecard: scorecard,
      languageRatingScales: JSON.parse(JSON.stringify(realm.objects('LanguageRatingScale').filtered(`program_id == ${scorecard.program_id}`)))
    };
  }

  _onClickIcon(rating) {
    this.setState({currentScore: rating.value});
    !!this.props.onPress && this.props.onPress(rating);
  }

  _findLangugaeRatingScale(ratingCode, language_code) {
    return this.state.languageRatingScales.filter(rating =>
      rating.rating_scale_code == ratingCode && rating.language_code == language_code
    )[0];
  }

  _getLanguageRatingScale(ratingCode) {
    const { translations } = this.context;
    const { scorecard } = this.state;
    let rating = this._findLangugaeRatingScale(ratingCode, scorecard.audio_language_code) || {};

    if (!scorecard.isSameLanguageCode) {
      let textRating = this._findLangugaeRatingScale(ratingCode, scorecard.text_language_code);
      rating.content = !!textRating && textRating.content;
    }

    rating.content = rating.content || translations[ratingCode];

    return rating;
  }

  _renderRatingIcon(rating, rowIndex) {
    const { translations } = this.context;
    const ratingLanguage = this._getLanguageRatingScale(rating.label);

    let activeIconStyle = rating.value == this.state.currentScore ? { borderColor: Color.headerColor } : {};
    let activeBgStyle = rating.value == this.state.currentScore ? {backgroundColor: 'rgba(245, 114, 0, 0.3)'} : {};
    let iconSizeRatio = iconSize * 0.8;

    const position = `${this.props.colIndex}${rowIndex}`;

    return (
      <View style={[styles.ratingWrapper, activeIconStyle, activeBgStyle]} key={uuidv4()}>
        <TouchableOpacity
          onPress={() => this._onClickIcon(rating) }
          style={{alignItems: 'center', marginBottom: 6}}>

          <View style={[styles.iconWrapper]}>
            <Image source={Images[rating.image]} style={{width: iconSizeRatio, height: iconSizeRatio, maxWidth: iconSize, maxHeight: iconSize}} />
          </View>

          <Text style={{fontSize: 16, color: '#22354c', textAlign: 'center'}}>{ratingLanguage.content}</Text>
        </TouchableOpacity>

        <View style={{flex: 1}}></View>

        <PlaySound
          containerStyle={{borderRadius: 2, width: '90%', maxWidth: 100, flexDirection: 'row'}}
          filePath={ratingLanguage.local_audio}
          isLocal={true}
          onPress={() => this._onClickIcon(rating)}
          onSavePlayingAudio={() => votingCriteriaService.savePlayingCriteriaAudio(position)}
          position={position}
        >
          <Text style={{marginRight: 8, color: '#fff'}}>{translations.listen}</Text>
        </PlaySound>
      </View>
    )
  }

  _renderRatingIcons() {
    const { translations } = this.context;
    let indicator = indicatorHelper.getDisplayIndicator(this.props.criteria, this.state.scorecard);

    return (
      <View style={{marginTop: 30}}>
        <Divider/>

        <View style={{flexDirection: 'row', marginTop: 30, marginRight: 40}}>
          <Text style={{fontSize: 18, fontFamily: FontFamily.title, textTransform: 'capitalize', marginRight: 10,}} numberOfLines={1}>
            { indicator.content || indicator.name}
          </Text>

          <View>
            { <PlaySound filePath={indicator.local_audio} /> }
          </View>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20, marginHorizontal: -8}}>
          { ratings.map((rating, index) => this._renderRatingIcon(rating, index)) }
        </View>
      </View>
    )
  }

  render() {
    return (this._renderRatingIcons());
  }
}

const styles = StyleSheet.create({
  iconWrapper: {
    marginBottom: 10,
    width: iconWrapperSize,
    height: iconWrapperSize,
    alignItems: 'center',
    justifyContent: 'center',

  },
  ratingWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 4,
    borderColor: '#ebebeb',
    paddingBottom: 10,
    borderRadius: 10
  }
})
