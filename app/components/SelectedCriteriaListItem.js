import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Color from '../themes/color';
import { Icon } from 'native-base';
import styles from '../themes/listItemStyle';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromSelected } from '../actions/selectedCriteriaAction';
import { addToProposed } from '../actions/proposedCriteriaAction';

const SelectedCriteriaListItem = (props) => {
  // const selectedCriterias = useSelector(state => state.selectedCriterias);
  const dispatch = useDispatch();

  const handleRemoveFromSelectedCriteria = (criteria) => {
    dispatch(removeFromSelected(criteria))
    dispatch(addToProposed(criteria));
  }

  return (
    <View style={styles.item}>
      <View style={styles.criteriaWrapper}>
        <View style={styles.criteria}>
          <Text style={{color: '#fff'}}>{props.criteria.tag}</Text>
        </View>

        <View style={{flex: 1}}></View>

        <TouchableOpacity
          onPress={() => handleRemoveFromSelectedCriteria(props.criteria)}
          style={styles.btnRemove}>
          <Text style={{color: '#fff'}}>Remove</Text>
        </TouchableOpacity>
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
