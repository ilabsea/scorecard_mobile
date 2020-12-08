import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class CriteriaCard extends Component {
  render() {
    const {criteria, criteriaName, index} = this.props;
    return (
      <View key={index} style={styles.criteriaCardContainer}>
        <View style={styles.iconContainer}>
          {index === 0 && <MaterialIcon name={criteria.shortcut} size={24} color="#787878" /> }
          {index > 0 && <Text style={styles.criteriaShortcut}>{criteria.shortcut}</Text>}
        </View>
        <View style={styles.contentContainer}>
          <Text numberOfLines={1} style={styles.criteriaLabel}>{criteriaName}</Text>
          <View style={{flexDirection: 'row', marginTop: 12}}>
            <MaterialIcon name="person" size={18} color="#7f7f7f" />
            <Text style={styles.criteriaValue}>{criteria.raised_count}</Text> 
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  criteriaCardContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    marginRight: 15,
    elevation: 3,
  },
  iconContainer: {
    width: 75,
    height: 75,
    backgroundColor: '#d0cdcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  criteriaShortcut: {
    color: '#787878',
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    width: 120,
  },
  criteriaLabel: {
    color: '#7f7f7f',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 12,
  },
  criteriaValue: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -4,
  },
});

export default CriteriaCard;