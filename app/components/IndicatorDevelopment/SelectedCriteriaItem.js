import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text
} from 'react-native';

import { Icon } from 'native-base';
import { Button } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { useDispatch } from 'react-redux';
import realm from '../../db/schema';
import { getDisplayIndicator } from '../../services/indicator_service';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import styles from '../../themes/scorecardListItemStyle';
import PlaySound from '../VotingCriteria/PlaySound';
import { removeFromSelected } from '../../actions/selectedCriteriaAction';
import { addToProposed } from '../../actions/proposedCriteriaAction';

const CriteriaItem = (props) => {
  const { translations, appLanguage } = useContext(LocalizationContext); // 1
  const dispatch = useDispatch();
  const scorecard = realm.objects('Scorecard').filtered(`uuid='${props.criteria.scorecard_uuid}'`)[0];
  const indicator = getDisplayIndicator(props.criteria, scorecard);

  function renderShortcutLabel(criteria) {
    return (
      <View style={[styles.statusIconWrapper, {backgroundColor: '#d0cdcd'}]}>
        <Text style={{fontSize: 60, color: '#787878', fontFamily: FontFamily.title}}>{indicator.content[0]}</Text>
      </View>
    )
  }

  function handleCriteria() {
    dispatch(removeFromSelected(props.criteria));
    dispatch(addToProposed(props.criteria));
  }

  return (
    <View
      onPress={ () => {} }
      style={[styles.listItem, styles.card]}>

      { renderShortcutLabel(props.criteria) }

      <View style={styles.contentWrapper}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.title} numberOfLines={1}>{indicator.content}</Text>
            <Text style={styles.subText}>{translations.raisedTimes}: ({props.criteria.count})</Text>
          </View>

          <View style={{paddingRight: 16}}>
            <PlaySound filePath={''}/>
          </View>
        </View>

        <View style={{flex: 1}}></View>

        <View style={styles.viewDetail}>
          <Button color='red' icon="trash-can-outline" mode="text" onPress={() => handleCriteria()}>
            { translations['remove'] }
          </Button>
        </View>
      </View>
    </View>
  )
}

CriteriaItem.defaultProps = {
  showIcon: true,
  criteria: { tag: 'Dumi', count: 1 },
  btnText: 'Add',
  btnStyle: {},
  onPress: {}
};

export default CriteriaItem;
