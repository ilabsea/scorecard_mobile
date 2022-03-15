import React, {Component} from 'react';
import { View, Text } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import { LocalizationContext } from '../../components/Translations';
import VotingCriteriaRatingIcon from './VotingCriteriaRatingIcon';
import realm from '../../db/schema';
import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';
import ratings from '../../db/jsons/ratings';
import PlaySound from './PlaySound';
import indicatorHelper from '../../helpers/indicator_helper';

import { getDeviceStyle } from '../../utils/responsive_util';
import IndicatorRatingItemTabletStyles from '../../styles/tablet/IndicatorRatingItemComponentStyle';
import IndicatorRatingItemMobileStyles from '../../styles/mobile/IndicatorRatingItemComponentStyle';

const responsiveStyles = getDeviceStyle(IndicatorRatingItemTabletStyles, IndicatorRatingItemMobileStyles);

export default class IndicatorRatingItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard = realm.objects('Scorecard').filtered(`uuid='${props.indicator.scorecard_uuid}'`)[0];

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
    let activeIconStyle = rating.value == this.state.currentScore ? { borderColor: Color.headerColor } : {};
    let activeBgStyle = rating.value == this.state.currentScore ? {backgroundColor: 'rgba(245, 114, 0, 0.3)'} : {};

    return (
      <VotingCriteriaRatingIcon
        key={uuidv4()}
        rating={rating}
        rowIndex={rowIndex}
        colIndex={this.props.colIndex}
        currentScore={this.state.currentScore}
        getLanguageRatingScale={(ratingCode) => this._getLanguageRatingScale(ratingCode)}
        onClickIcon={(rating) => this._onClickIcon(rating)}
        activeIconStyle={activeIconStyle}
        activeBgStyle={activeBgStyle}
      />
    )
  }

  _renderRatingLabel(rating, rowIndex) {
    const ratingLanguage = this._getLanguageRatingScale(rating.label);

    return (
      <Text key={uuidv4()} style={responsiveStyles.ratingLabel}>
        {rowIndex + 1} {ratingLanguage.content} 
        { rowIndex < 4 &&
          <Text style={{fontSize: 8}}> | </Text>
        }
      </Text>
    )
  }

  _renderRatingIcons() {
    let indicator = indicatorHelper.getDisplayIndicator(this.props.indicator, this.state.scorecard);

    return (
      <View style={responsiveStyles.ratingIndicatorContainer}>
        <View style={responsiveStyles.ratingIndicatorWrapper}>
          <PlaySound filePath={indicator.local_audio} isHeader={true}
            containerStyle={responsiveStyles.ratingIconContainer}
          >
            <Text style={responsiveStyles.indicatorLabel} numberOfLines={1}>
              {this.props.indicator.order}. { indicator.content || indicator.name}
            </Text>
          </PlaySound>

          { !DeviceInfo.isTablet() &&
            <View style={{flexDirection: 'row', paddingLeft: 0, marginLeft: -2, justifyContent: 'center'}}>
              { ratings.map((rating, index) => this._renderRatingLabel(rating, index)) }
            </View>
          }

          <View style={responsiveStyles.ratingListContainer}>
            { ratings.map((rating, index) => this._renderRatingIcon(rating, index)) }
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (this._renderRatingIcons());
  }
}