import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

import styles from '../../styles/mobile/ScorecardResultAccordionComponentStyle';

class ScorecardResultAccordionEditButton extends Component {
  render() {
    const { criteria, fieldName, indicator } = this.props;

    return (
      <View style={{flexDirection: 'row', padding: 6, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={styles.btnEdit}
          onPress={() => this.props.onPress(criteria, fieldName, indicator, false)}
        >
          <Text style={styles.btnEditText}>{JSON.parse(criteria[fieldName]).length}</Text>
          <Icon name={'pen'} type="FontAwesome5" style={styles.btnEditIcon}/>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ScorecardResultAccordionEditButton;