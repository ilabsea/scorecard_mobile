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
import { getDisplayIndicator } from '../../services/indicator_service';

const CriteriaListItem = (props) => {
  const { translations, appLanguage } = useContext(LocalizationContext); // 1
  const dispatch = useDispatch();
  const scorecard = realm.objects('Scorecard').filtered(`uuid='${props.criteria.scorecard_uuid}'`)[0];
  const indicator = getDisplayIndicator(props.criteria, scorecard);

  const showPopup = () => {
    dispatch(setModalCriteria(indicator));
    dispatch(setModalVisible(true));
  }

  return (
    <View style={styles.item}>
      <View style={styles.criteriaWrapper}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity style={[styles.criteria, {flexDirection: 'row', flexGrow: 1}]} onPress={() => showPopup()}>
            <Text style={{color: '#fff', paddingHorizontal: 10, flex: 1}} numberOfLines={1}>{indicator.name || indicator.content}</Text>
            <Text style={{color: '#fff', paddingHorizontal: 10}}>({props.criteria.count})</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={ () => props.onPress() }
          style={[styles.btn, props.btnStyle]}>
          { <Text style={{color: '#fff'}}>{props.btnText}</Text> }
          { props.showIcon && <Icon name='chevron-forward-outline' style={{fontSize: 16, color: '#fff', marginLeft: 8}} /> }

        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.footer} onPress={() => showPopup()}>
        {_renderIndicatorSign(indicator)}

        <View style={styles.viewDetail}>
          <Text>{translations.viewDetail}</Text>
          <Icon name='chevron-forward-outline' style={{fontSize: 16}} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const _renderIndicatorSign = (indicator) => {
  const { translations } = useContext(LocalizationContext);

  if (indicator.local_audio != null) {
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <Icon name='mic-outline' style={{fontSize: 20, marginTop: 2}} />
        <Text style={{flex: 1}}>{translations.audio}</Text>
      </View>
    );
  }

  return (
    <View style={{flexDirection: 'row', flex: 1}}>
      <Icon name='attach-outline' style={{fontSize: 20, marginTop: 2}} />
      <Text style={{flex: 1}}>1 {translations.note}</Text>
    </View>
  );
}

CriteriaListItem.defaultProps = {
  showIcon: true,
  criteria: { tag: 'Dumi', count: 1 },
  btnText: 'Add',
  btnStyle: {},
  onPress: {}
};

export default CriteriaListItem;
