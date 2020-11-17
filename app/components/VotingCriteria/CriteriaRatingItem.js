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

const iconSize = 80;
const iconWrapperSize = 98;

export default class CriteriaRatingItem extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  _renderRatingIcon(icon) {
    let activeIconStyle = icon.image == 'good' ? { borderColor: Color.headerColor } : {};

    return (
      <TouchableOpacity
        key={uuidv4()}
        onPress={() => console.log(0)}
        style={{flex: 1, alignItems: 'center', marginHorizontal: 10}}>

        <View style={[styles.iconWrapper, activeIconStyle]}>
          <Image source={Images[icon.image]} style={{width: iconSize, height: iconSize}} />
        </View>

        <Text style={{fontSize: 16, color: '#22354c'}}>{icon.label}</Text>
      </TouchableOpacity>
    )
  }

  _iconData() {
    return ([
      { image: 'very_bad', label: 'Very Bad' },
      { image: 'bad', label: 'Bad' },
      { image: 'acceptable', label: 'Acceptable' },
      { image: 'good', label: 'Good' },
      { image: 'very_good', label: 'Very Good' },
    ]);
  }

  _renderRatingIcons() {
    let icons = this._iconData();

    return (
      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Criter A</Text>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          { icons.map(icon => this._renderRatingIcon(icon)) }
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
