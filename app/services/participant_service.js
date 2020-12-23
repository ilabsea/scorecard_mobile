import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {getIndicatorShortcutName, getDisplayIndicator} from './indicator_service';
import realm from '../db/schema';

class ParticipantCell {
  constructor(cellName, cellValue, buttonAction, actionLabel, labelTranslation) {
    this.cellValue = cellValue;
    this.cellName = cellName;
    this.actionLabel = actionLabel;
    this.cellItem = {
      no: this.textCell(),
      age: this.textCell(),
      gender: this.genderCell(labelTranslation),
      disability: this.booleanCell(labelTranslation),
      indicator: this.indicatorCell(),
      note: this.textCell(),
      action: this.actionCell(),
    };
    this.buttonAction = buttonAction;

  }

  textCell = () => {
    return (
      <View style={styles.cellContainer}>
        <Text>{this.cellValue}</Text>
      </View>
    );
  };

  genderCell = (labelTranslation) => {
    return (
      <View style={styles.cellContainer}>
        <Text>{this.cellValue === 'M' ? labelTranslation.male : labelTranslation.female}</Text>
      </View>
    );
  }

  booleanCell = (labelTranslation) => {
    return (
      <View style={styles.cellContainer}>
        <Text>
          {this.cellValue === '' ? '' : this.cellValue ? labelTranslation.yes : labelTranslation.no}
        </Text>
      </View>
    );
  };

  indicatorCell = () => {
    if (this.cellName != 'indicator' || !(this.cellValue && this.cellValue.length)) {
      return null;
    }

    let doms = this.cellValue.map((proposedCriteria, index) => {
      let indicator = getDisplayIndicator(proposedCriteria);

      return (
        <View key={index} style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.indicatorBadge}>
            <Text style={styles.indicatorLabel}>
              {getIndicatorShortcutName(indicator.content || indicator.name)}
            </Text>
          </View>
        </View>
      );
    });

    return doms;
  };

  actionCell = () => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', alignSelf: 'center'}}
        onPress={() => this.buttonAction(this.cellValue)}>
        <MaterialIcon name="edit" color="#e4761e" size={18} />
        <Text
          style={{
            color: '#e4761e',
            textTransform: 'uppercase',
            fontWeight: '700',
            marginLeft: 4,
          }}>
          {this.actionLabel}
        </Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  indicatorBadge: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  indicatorLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    backgroundColor: '#787878',
    padding: 5,
    borderRadius: 3,
  },
  cellContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});

const getRaisedParticipants = (reducerParticipants, scorecardUuid, ) => {
  if (reducerParticipants.length === 0)
    return realm.objects('Participant').filtered(`scorecard_uuid == '${scorecardUuid}' AND raised=true`).sorted('order', false);

  return reducerParticipants;
}

export {ParticipantCell, getRaisedParticipants};
