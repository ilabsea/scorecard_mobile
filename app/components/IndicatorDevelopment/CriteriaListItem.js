import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Icon } from 'native-base';
import styles from '../../themes/listItemStyle';
import { LocalizationContext } from '../Translations';
import { useDispatch } from 'react-redux';
import { setModalCriteria, setModalVisible} from '../../actions/criteriaModalAction';
import realm from '../../db/schema';

const CriteriaListItem = (props) => {
  const { translations, appLanguage } = useContext(LocalizationContext); // 1
  const dispatch = useDispatch();

  const showPopup = () => {
    let indicator;

    if ( props.criteria.indicatorable_type == 'predefined' ) {
      indicator = JSON.parse(JSON.stringify(realm.objects('LanguageIndicator').filtered(`indicator_id='${props.criteria.indicatorable_id}' AND language_code='${appLanguage}'`)[0]));
      indicator.tag = props.criteria.tag;
    } else {
      indicator = JSON.parse(JSON.stringify(realm.objects('CustomIndicator').filtered(`uuid='${props.criteria.indicatorable_id}'`)[0]));
      indicator.local_audio = indicator.audio;
    }

    dispatch(setModalCriteria(indicator));
    dispatch(setModalVisible(true));
  }

  return (
    <View style={styles.item}>
      <View style={styles.criteriaWrapper}>
        <TouchableOpacity style={styles.criteria} onPress={() => showPopup()}>
          <Text style={{color: '#fff', paddingHorizontal: 6}}>{props.criteria.tag} ({props.criteria.count})</Text>
        </TouchableOpacity>

        <View style={{flex: 1}}></View>

        <TouchableOpacity
          onPress={ () => props.onPress() }
          style={[styles.btn, props.btnStyle]}>
          { <Text style={{color: '#fff'}}>{props.btnText}</Text> }
          { props.showIcon && <Icon name='chevron-forward-outline' style={{fontSize: 16, color: '#fff', marginLeft: 8}} /> }

        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.footer} onPress={() => showPopup()}>
        <Text style={{flex: 1}}>1 Note</Text>

        <View style={styles.viewDetail}>
          <Text>{translations.viewDetail}</Text>
          <Icon name='chevron-forward-outline' style={{fontSize: 16}} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

CriteriaListItem.defaultProps = {
  showIcon: true,
  criteria: { tag: 'Dumi', count: 1 },
  btnText: 'Add',
  btnStyle: {},
  onPress: {}
};

export default CriteriaListItem;
