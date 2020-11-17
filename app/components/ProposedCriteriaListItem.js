import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'native-base';
import Color from '../themes/color';
import styles from '../themes/listItemStyle';

import { useSelector, useDispatch } from 'react-redux';
import { addToSelected } from '../actions/selectedCriteriaAction';
import { removeFromProposed } from '../actions/proposedCriteriaAction';
import { LocalizationContext } from './Translations';

const ProposedCriteriaListItem = (props) => {
  const dispatch = useDispatch();
  const { translations } = useContext(LocalizationContext); // 1

  const handleAddToSelectedCriteria = (criteria) => {
    dispatch(addToSelected(criteria));
    dispatch(removeFromProposed(criteria));
  }

  return (
    <View style={styles.item}>
      <View style={styles.criteriaWrapper}>
        <View style={styles.criteria}>
          <Text style={{color: '#fff'}}>{props.criteria.tag}</Text>
        </View>

        <View style={{flex: 1}}></View>

        <TouchableOpacity
          onPress={() => handleAddToSelectedCriteria(props.criteria)}
          style={styles.btnAdd}>
          <Text style={{color: '#fff', marginRight: 12}}>Add</Text>
          <Icon name='chevron-forward-outline' style={{fontSize: 16, color: '#fff'}} />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={{flex: 1}}>1 Note</Text>

        <View style={styles.viewDetail}>
          <Text>{translations.viewDetail}</Text>
          <Icon name='chevron-forward-outline' style={{fontSize: 16}} />
        </View>
      </View>
    </View>
  )
}

export default ProposedCriteriaListItem;
