import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import Color from '../themes/color';
import { Icon } from 'native-base';
import styles from '../themes/listItemStyle';

const SelectedCriteriaListItem = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.criteriaWrapper}>
        <View style={styles.criteria}>
          <Text style={{color: '#fff'}}>Other</Text>
        </View>

        <View style={{flex: 1}}></View>

        <View style={styles.btnRemove}>
          <Text style={{color: '#fff'}}>Remove</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={{flex: 1}}>1 Note</Text>

        <View style={styles.viewDetail}>
          <Text>VIEW DETAIL</Text>
          <Icon name='chevron-forward-outline' style={{fontSize: 16}} />
        </View>
      </View>
    </View>
  )
}

export default SelectedCriteriaListItem;
