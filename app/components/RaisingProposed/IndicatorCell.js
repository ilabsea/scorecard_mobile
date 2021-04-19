import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import indicatorHelper from '../../helpers/indicator_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import UserTableTabletStyles from './styles/tablet/UserTableStyle';
import UserTableMobileStyles from './styles/mobile/UserTableStyle';

const responsiveStyles = getDeviceStyle(UserTableTabletStyles, UserTableMobileStyles);

class TextCell extends Component {

  _renderItem() {
    let doms = this.props.cellValue.map((proposedCriteria, index) => {
      let indicator = indicatorHelper.getDisplayIndicator(proposedCriteria);

      return (
        <View key={index} style={{justifyContent: 'center', width: 'auto'}}>
          <View style={styles.indicatorBadge}>
            <Text style={[styles.indicatorLabel, responsiveStyles.indicatorLabel]} numberOfLines={1}>
              {indicator.content || indicator.name}
            </Text>
          </View>
        </View>
      );
    });

    return doms;
  }

  _renderCell() {
    if (this.props.cellName != 'indicator' || !(this.props.cellValue && this.props.cellValue.length))
      return null;

    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingVertical: 2}}>
        { this._renderItem() }
      </View>
    )
  }

  render() {
    return this._renderCell();
  }
}

const styles = StyleSheet.create({
  indicatorBadge: {
    padding: 2,
    marginHorizontal: 2,
  },
  indicatorLabel: {
    color: '#ffffff',
    fontSize: 14,
    backgroundColor: '#787878',
    paddingHorizontal: 5,
    borderRadius: 3,
    maxWidth: 120,
  },
});

export default TextCell;