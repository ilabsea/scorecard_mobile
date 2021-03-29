import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Divider} from 'react-native-paper';
import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import Color from '../../themes/color';
import Images from '../../utils/images';
import uuidv4 from '../../utils/uuidv4';
import ratings from '../../db/jsons/ratings';
import PlaySound from './PlaySound';
import indicatorHelper from '../../helpers/indicator_helper';
import votingCriteriaService from '../../services/votingCriteriaService';

import { getDeviceStyle } from '../../utils/responsive_util';
import CriteriaRatingItemTabletStyles from './styles/tablet/CriteriaRatingItemStyle';
import CriteriaRatingItemMobileStyles from './styles/mobile/CriteriaRatingItemStyle';

const responsiveStyles = getDeviceStyle(CriteriaRatingItemTabletStyles, CriteriaRatingItemMobileStyles);

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

    const position = `${this.props.colIndex}${rowIndex}`;

    return (
      <View style={[responsiveStyles.ratingWrapper, activeIconStyle, activeBgStyle]} key={uuidv4()}>
        <TouchableOpacity
          onPress={() => this._onClickIcon(rating) }
          style={responsiveStyles.ratingItemContainer}>

          <View style={[responsiveStyles.iconWrapper]}>
            <Image source={Images[rating.image]} style={responsiveStyles.ratingIcon} />
          </View>

          <Text style={responsiveStyles.ratingLabel}>{ratingLanguage.content}</Text>
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
          <Text style={responsiveStyles.playSoundLabel}>{translations.listen}</Text>
        </PlaySound>
      </View>
    )
  }

  _renderRatingIcons() {
    const { translations } = this.context;
    let indicator = indicatorHelper.getDisplayIndicator(this.props.criteria, this.state.scorecard);

    return (
      <View style={responsiveStyles.ratingIndicatorContainer}>
        <Divider/>

        <View style={responsiveStyles.ratingIconContainer}>
          <Text style={responsiveStyles.indicatorLabel} numberOfLines={1}>
            { indicator.content || indicator.name}
          </Text>

          <View>
            { <PlaySound filePath={indicator.local_audio} /> }
          </View>
        </View>

        <View style={responsiveStyles.ratingListContainer}>
          { ratings.map((rating, index) => this._renderRatingIcon(rating, index)) }
        </View>
      </View>
    )
  }

  render() {
    return (this._renderRatingIcons());
  }
}