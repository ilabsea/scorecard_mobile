import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Radio} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../themes/color';
class IndicatorCriteriaSelection extends Component {
  iconContainerBackground = (indicator) => {
    return indicator.isSelected ? {backgroundColor: Color.primaryButtonColor} : {};
  }

  symbolColor = (indicator) => {
    return indicator.isSelected ? {color: '#ffffff'} : {};
  }

  indicatorCriteriaBox = (indicator, index) => {
    return (
      <TouchableOpacity style={styles.criteriaBox}
        onPress={() => this.props.selectIndicator(index)}>
        <View style={[styles.iconContainer, this.iconContainerBackground(indicator)]}>
          { index != this.props.indicators.length - 1 &&
            <Text style={[styles.criteriaSymbol, this.symbolColor(indicator)]}>{indicator.symbol}</Text>
          }
          { index === this.props.indicators.length - 1 && <MaterialIcon name="add" size={50} color={indicator.isSelected ? "#ffffff" : "#787878"} />}
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.criteriaLabel}>{indicator.label}</Text>
          <Radio color={'#f0ad4e'} selectedColor={'#5cb85c'} selected={indicator.isSelected} style={{flex: 1, alignItems: 'flex-end'}} />
        </View>
      </TouchableOpacity>
    )
  }

  renderIndicatorItem = (indicator, index) => {
    if (index === this.props.indicators.length - 1)
      return (
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
          {this.indicatorCriteriaBox(indicator, index)}
          <View style={{flex: 1, marginHorizontal: 10}} />
        </View>
      )

    return this.indicatorCriteriaBox(indicator, index);
  }

  render() {
    return (
      <FlatList
        data={this.props.indicators}
        renderItem={({item, index}) => this.renderIndicatorItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    );
  }
}

const styles = StyleSheet.create({
  criteriaBox: {
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    elevation: 3,
    marginVertical: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#d0cdcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  criteriaSymbol: {
    color: '#787878',
    fontSize: 40,
    fontWeight: 'bold',
  },
  detailContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  criteriaLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default IndicatorCriteriaSelection;