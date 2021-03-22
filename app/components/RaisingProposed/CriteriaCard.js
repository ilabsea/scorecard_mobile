import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import IndicatorService from '../../services/indicator_service';
import {LocalizationContext} from '../Translations';

class CriteriaCard extends Component {
  static contextType = LocalizationContext;

  renderCriteriaImage = () => {
    const indicatorService = new IndicatorService();
    const indicator = this.props.criteria.indicatorable_type === 'predefined' ? indicatorService.find(this.props.criteria.indicatorable_id) : null;

    if (indicator && indicator.local_image)
      return (
        <ImageBackground source={{uri: `file://${indicator.local_image}`}} style={{width: '100%', height: '100%'}} resizeMode='contain' />
      );

    return <View style={styles.blankContainer}/>
  }

  render() {
    const {translations} = this.context;
    const {criteria, criteriaName, index} = this.props;
    return (
      <View key={index} style={styles.criteriaCardContainer}>
        <View style={styles.iconContainer}>
          {index === 0 &&
            <View style={[styles.blankContainer, { justifyContent: 'center', alignItems: 'center' }]}>
              <MaterialIcon name={criteria.shortcut} size={24} color="#787878" />
            </View>
          }

          {index > 0 && this.renderCriteriaImage()}
        </View>
        <View style={styles.contentContainer}>
          <Text numberOfLines={1} style={styles.criteriaLabel}>{criteriaName}</Text>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <MaterialIcon name="person" size={18} color="#7f7f7f" />
            <Text style={styles.criteriaValue}>{criteria.raised_count} {translations.pax}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  criteriaCardContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    marginRight: 15,
    elevation: 3,
  },
  iconContainer: {
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  criteriaShortcut: {
    color: '#787878',
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    width: 120,
  },
  criteriaLabel: {
    color: '#7f7f7f',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 12,
  },
  criteriaValue: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -4,
  },
  blankContainer: {
    backgroundColor: '#d0cdcd',
    width: '100%',
    height: '100%',
  }
});

export default CriteriaCard;
