import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
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

const iconSize = 80;
const iconWrapperSize = 98;

export default class CriteriaRatingItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      currentScore: 0,
      languageRatingScales: [],
    };
  }

  componentDidMount() {
    const scorecardUuid = this.props.criteria.scorecard_uuid;
    const scorecard = realm.objects('Scorecard').filtered(`uuid == '${scorecardUuid}'`)[0];
    this.setState({
      languageRatingScales: realm.objects('LanguageRatingScale').filtered(`program_id == ${scorecard.program_id} AND language_code == '${scorecard.audio_language_code}'`)
    });
  }

  _onClickIcon(rating) {
    this.setState({currentScore: rating.value});
    !!this.props.onPress && this.props.onPress(rating);
  }

  _getLanguageRatingScaleAudio(scaleCode) {
    const languageRatingScale = this.state.languageRatingScales.filter(langRatingScale => {
      return langRatingScale.rating_scale_code === scaleCode;
    });
    return languageRatingScale.length > 0 ? languageRatingScale[0].local_audio : '';
  }

  _renderRatingIcon(rating) {
    const { translations } = this.context;
    let activeIconStyle = rating.value == this.state.currentScore ? { borderColor: Color.headerColor } : {};
    let activeBgStyle = rating.value == this.state.currentScore ? {backgroundColor: 'rgba(245, 114, 0, 0.3)'} : {};
    const audioRatingAudio = this._getLanguageRatingScaleAudio(rating.label);
    return (
      <View style={[styles.ratingWrapper, activeIconStyle, activeBgStyle]} key={uuidv4()}>
        <TouchableOpacity
          onPress={() => this._onClickIcon(rating) }
          style={{alignItems: 'center', marginBottom: 6}}>

          <View style={[styles.iconWrapper]}>
            <Image source={Images[rating.image]} style={{width: iconSize, height: iconSize}} />
          </View>

          <Text style={{fontSize: 16, color: '#22354c'}}>{translations[rating.label]}</Text>
        </TouchableOpacity>

        <PlaySound
          containerStyle={{borderRadius: 2, width: 100, flexDirection: 'row'}}
          filePath={audioRatingAudio}
          isLocal={true}>
          <Text style={{marginRight: 8, color: '#fff'}}>{translations.listen}</Text>
        </PlaySound>
      </View>
    )
  }

  _getIndicator() {
    const { appLanguage } = this.context;
    const { criteria } = this.props;

    if ( criteria.indicatorable_type == 'predefined' ) {
      let indi = realm.objects('LanguageIndicator').filtered(`indicator_id='${criteria.indicatorable_id}' AND language_code='${appLanguage}'`)[0];
      indi = indi || realm.objects('Indicator').filtered(`id='${criteria.indicatorable_id}'`)[0];
      indi = JSON.parse(JSON.stringify(indi));
      indi.content = indi.content || indi.name;

      return indi;
    }

    return JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`uuid='${criteria.indicatorable_id}'`)[0]));
  }

  _renderRatingIcons() {
    const { translations } = this.context;
    let indicator = this._getIndicator();

    return (
      <View style={{marginTop: 30}}>
        <Divider/>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <Text style={{fontSize: 18, fontFamily: FontFamily.title, textTransform: 'capitalize', marginRight: 10}}>
            { indicator.content }
          </Text>

          { !!indicator.local_audio && <PlaySound filePath={indicator.local_audio} /> }
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          { ratings.map(rating => this._renderRatingIcon(rating)) }
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    borderWidth: 4,
    borderColor: '#ebebeb',
    paddingBottom: 10,
    borderRadius: 10
  }
})
