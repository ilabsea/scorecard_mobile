import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

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
      currentScore: 0
    };
  }

  _onClickIcon(rating) {
    this.setState({currentScore: rating.value});
    !!this.props.onPress && this.props.onPress(rating);
  }

  _renderRatingIcon(rating) {
    const { appLanguage } = this.context;
    let activeIconStyle = rating.value == this.state.currentScore ? { borderColor: Color.headerColor } : {};

    return (
      <View style={[styles.ratingWrapper, activeIconStyle]} key={uuidv4()}>
        <TouchableOpacity
          onPress={() => this._onClickIcon(rating) }
          style={{alignItems: 'center', marginBottom: 6}}>

          <View style={[styles.iconWrapper]}>
            <Image source={Images[rating.image]} style={{width: iconSize, height: iconSize}} />
          </View>

          <Text style={{fontSize: 16, color: '#22354c'}}>{rating.label}</Text>
        </TouchableOpacity>

        <PlaySound filePath={`${appLanguage}_${rating.audio}`} isLocal={true}/>
      </View>
    )
  }

  _getIndicator() {
    const { appLanguage } = this.context;
    const { criteria } = this.props;

    if ( criteria.indicatorable_type == 'predefined' ) {
      return JSON.parse(JSON.stringify(realm.objects('LanguageIndicator').filtered(`indicator_id='${criteria.indicatorable_id}' AND language_code='${appLanguage}'`)[0]));
    }

    return JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`uuid='${criteria.indicatorable_id}'`)[0]));
  }

  _renderRatingIcons() {
    const { translations } = this.context;
    let indicator = this._getIndicator();

    return (
      <View style={{marginTop: 30}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 18, fontFamily: FontFamily.title, textTransform: 'capitalize', marginRight: 10}}>
            {this.props.criteria.tag}
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
    borderColor: 'transparent',
    paddingBottom: 10,
    borderRadius: 10
  }
})
