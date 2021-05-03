import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {LocalizationContext} from '../Translations';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import RaisingProposedTabletStyles from '../../styles/tablet/RaisingProposedComponentStyle';
import RaisingProposedMobileStyles from '../../styles/mobile/RaisingProposedComponentStyle';

const responsiveStyles = getDeviceStyle(RaisingProposedTabletStyles, RaisingProposedMobileStyles);

class CriteriaCard extends Component {
  static contextType = LocalizationContext;

  render() {
    const {translations} = this.context;
    const {criteria, criteriaName, index} = this.props;
    return (
      <View key={index} style={styles.criteriaCardContainer}>
        <View style={styles.contentContainer}>
          <Text numberOfLines={1} style={styles.criteriaLabel}>{criteriaName}</Text>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <MaterialIcon name="person" size={18} color="#7f7f7f" />
            <Text style={[styles.criteriaValue, responsiveStyles.criteriaValue]}>
              {criteria.raised_count} {translations.pax}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  criteriaCardContainer: {
    backgroundColor: Color.whiteColor,
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
    color: Color.paleBlackColor,
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    width: 120,
    height: 75,
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
    backgroundColor: Color.cardListItemAvataBg,
    width: '100%',
    height: '100%',
  }
});

export default CriteriaCard;
