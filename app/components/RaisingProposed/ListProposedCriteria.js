import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {LocalizationContext} from '../Translations';
class ListProposedCriteria extends Component {
  static contextType = LocalizationContext;
  indicators = [
    {label: 'All Indicator', value: 50, symbol: 'view-agenda'},
    {label: 'Indicator A', value: 10, symbol: 'A'},
    {label: 'Indicator B', value: 10, symbol: 'B'},
    {label: 'Indicator C', value: 10, symbol: 'C'},
  ]

  renderProposedCriteriaBoxes = () => {
    return this.indicators.map((indicator, index) => {
      return (
        <View style={styles.criteriaBox}>
          <View style={styles.iconContainer}>
            {index === 0 && <MaterialIcon name={indicator.symbol} size={24} /> }
            {index > 0 && <Text style={styles.criteriaSymbol}>{indicator.symbol}</Text>}
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.criteriaLabel}>{indicator.label}</Text>
            <View style={{flexDirection: 'row', marginTop: 12}}>
              <MaterialIcon name="person" size={18} color="#7f7f7f" />
              <Text style={styles.criteriaValue}>{indicator.value}</Text>
            </View>
          </View>
        </View>
      );
    });
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{marginTop: 15}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>{translations['listProposedCriteria']}</Text>
          <Text style={styles.viewAllLabel}>
            {translations['viewAll']}
          </Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row', paddingBottom: 6, marginTop: 20}}
        >
          {this.renderProposedCriteriaBoxes()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: '#22354c',
  },
  viewAllLabel: {
    textTransform: 'uppercase',
    color: '#e4761e',
    fontWeight: 'bold',
  },
  criteriaBox: {
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
  criteriaSymbol: {
    color: '#787878',
    fontSize: 30,
    fontWeight: 'bold',
  },
  detailContainer: {
    paddingLeft: 10,
    paddingRight: 15,
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

export default ListProposedCriteria;
