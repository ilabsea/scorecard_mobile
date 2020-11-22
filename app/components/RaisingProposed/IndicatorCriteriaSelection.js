import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Radio} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Color from '../../themes/color';
import realm from '../../db/schema';
class IndicatorCriteriaSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indicators: [],
      selectedIndicator: null,
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.setState({indicators: this.getIndicator()});
  }

  iconContainerBackground = (indicator) => {
    return indicator.isSelected ? {backgroundColor: Color.primaryButtonColor} : {};
  }

  symbolColor = (indicator) => {
    return indicator.isSelected ? {color: '#ffffff'} : {};
  }

  selectIndicator = (index) => {
    const indicators = this.state.indicators;
    indicators.map((indicator) => (indicator.isSelected = false));
    indicators[index].isSelected = true;
    this.setState({
      indicators: indicators,
      selectedIndicator: indicators[index],
      isModalVisible: index === indicators.length - 1 ? true : false,
    }, () => {
      this.props.selectIndicator();
    });
  }

  indicatorCriteriaBox = (indicator, index) => {
    return (
      <TouchableOpacity style={styles.criteriaBox}
        onPress={() => this.selectIndicator(index)}>
        <View style={[styles.iconContainer, this.iconContainerBackground(indicator)]}>
          { index != this.state.indicators.length - 1 &&
            <Text style={[styles.criteriaSymbol, this.symbolColor(indicator)]}>{indicator.symbol}</Text>
          }
          { index === this.state.indicators.length - 1 && <MaterialIcon name="add" size={50} color={indicator.isSelected ? "#ffffff" : "#787878"} />}
        </View>
        <View style={styles.detailContainer}>
          <View style={styles.labelContainer}>
            <Text>{indicator.label.split(":").pop()}</Text>
          </View>
          <Radio color={'#f0ad4e'} selectedColor={'#5cb85c'} selected={indicator.isSelected} />
        </View>
      </TouchableOpacity>
    )
  }

  renderIndicatorItem = (indicator, index) => {
    if (index === this.state.indicators.length - 1) {
      return (
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
          {this.indicatorCriteriaBox(indicator, index)}
          <View style={{flex: 1, marginHorizontal: 10}} />
        </View>
      )
    }
    return this.indicatorCriteriaBox(indicator, index);
  }

  getIndicator = () => {
    let indicators = [];
    const savedIndicators = realm.objects('Indicator').filtered('uuid = "'+ this.props.uuid +'"');
    const selectedParticipant = realm.objects('Participant').filtered('uuid = "'+ this.props.participantUUID +'"')[0];

    savedIndicators.map((indicator) => {
      const attr = {
        id: indicator.id,
        label: indicator.name,
        symbol: indicator.name.split(':')[0],
        isSelected: (selectedParticipant != undefined && selectedParticipant.indicator_id === indicator.id) ? true : false,
      };
      indicators.push(attr);
    });
    indicators.push({label: 'Other indicator', id: '', symbol: 'add', isSelectd: false})
    return indicators;
  }

  render() {
    return (
      <FlatList
        data={this.state.indicators}
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
    height: 100,
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
    fontSize: 30,
    fontWeight: 'bold',
  },
  detailContainer: {
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default IndicatorCriteriaSelection;