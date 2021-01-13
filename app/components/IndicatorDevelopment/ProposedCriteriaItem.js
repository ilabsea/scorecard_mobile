import React, { useContext, useState } from 'react';
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
import realm from '../../db/schema';
import { getDisplayIndicator } from '../../services/indicator_service';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import itemStyles from '../../themes/scorecardListItemStyle';
import PlaySound from '../VotingCriteria/PlaySound';
import Color from '../../themes/color';

const ProposedCriteriaItem = (props) => {
  const { translations } = useContext(LocalizationContext); // 1
  const [ active, setActive ] = useState(false);
  const scorecard = realm.objects('Scorecard').filtered(`uuid='${props.criteria.scorecard_uuid}'`)[0];
  const indicator = getDisplayIndicator(props.criteria, scorecard);

  function renderShortcutLabel() {
    let activeStyle = active ? { backgroundColor: Color.headerColor } : {};
    let textColor = active ? '#fff' : '#787878';

    return (
      <View style={[itemStyles.statusIconWrapper, styles.statusIconWrapper, activeStyle]}>
        <Text style={{fontSize: 60, color: textColor, fontFamily: FontFamily.title}}>{indicator.content[0]}</Text>
      </View>
    )
  }

  function handleSelected() {
    let state = !active;
    let action = state ? 'add' : 'remove';

    if (action == 'add' && !props.availableAmount) {
      return;
    }

    setActive(state);
    !!props.onPress && props.onPress(props.criteria, action);
  }

  const getBorderColor = active ? Color.headerColor : '#ccc';

  return (
    <TouchableOpacity
      onPress={ () => handleSelected() }
      style={[itemStyles.listItem, { borderWidth: 1, borderColor: getBorderColor}]}>

      { renderShortcutLabel() }

      <View style={[itemStyles.contentWrapper, {flexDirection: 'row'}]}>
        <View style={{flex: 1}}>
          <Text style={itemStyles.title} numberOfLines={1}>{indicator.content}</Text>
          <Text style={itemStyles.subText}>{translations.raisedTimes}: ({props.criteria.count})</Text>
        </View>

        <View style={{paddingRight: 16, justifyContent: 'center'}}>
          <PlaySound filePath={indicator.local_audio}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

ProposedCriteriaItem.defaultProps = {
  criteria: { tag: 'Dumi', count: 1 },
  onPress: {}
};

export default ProposedCriteriaItem;

const styles = StyleSheet.create({
  statusIconWrapper: {
    backgroundColor: '#d0cdcd',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3
  }
})
