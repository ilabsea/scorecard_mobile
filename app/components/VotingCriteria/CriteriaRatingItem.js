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
    let activeIconStyle = rating.value == this.state.currentScore ? { borderColor: Color.headerColor } : {};

    return (
      <TouchableOpacity
        key={uuidv4()}
        onPress={() => this._onClickIcon(rating) }
        style={{flex: 1, alignItems: 'center', marginHorizontal: 10}}>

        <View style={[styles.iconWrapper, activeIconStyle]}>
          <Image source={Images[rating.image]} style={{width: iconSize, height: iconSize}} />
        </View>

        <Text style={{fontSize: 16, color: '#22354c'}}>{rating.label}</Text>
      </TouchableOpacity>
    )
  }

  _ratingData() {
    return ([
      { score: 1, image: 'very_bad', label: 'Very Bad' },
      { score: 2, image: 'bad', label: 'Bad' },
      { score: 3, image: 'acceptable', label: 'Acceptable' },
      { score: 4, image: 'good', label: 'Good' },
      { score: 5, image: 'very_good', label: 'Very Good' },
    ]);
  }

  _renderRatingIcons() {
    return (
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize'}}>{this.props.criteria.tag}</Text>

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
    borderRadius: iconWrapperSize/2,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'transparent'
  }
})
