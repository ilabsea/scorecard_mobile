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
      selectedIndicators: [],
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.setState({indicators: this.getIndicator()});
  }

  iconContainerBackground = (indicator) => {
    return indicator.isSelected ? {backgroundColor: Color.primaryButtonColor} : {};
  }

  shortcutColor = (indicator) => {
    return indicator.isSelected ? {color: '#ffffff'} : {};
  }

  selectIndicator = (index) => {
    let indicators = this.state.indicators;
    let selectedIndicators = this.state.selectedIndicators;
    if (indicators[index].isSelected)
      selectedIndicators = selectedIndicators.filter((indicator) => indicator.id !== indicators[index].id);
    else
      selectedIndicators.push(indicators[index]);

    indicators[index].isSelected = !indicators[index].isSelected;
    this.setState({
      indicators,
      selectedIndicators,
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
            <Text style={[styles.criteriaShortcut, this.shortcutColor(indicator)]}>{indicator.shortcut}</Text>
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
    let selectedIndicators = [];
    savedIndicators.map((indicator) => {
      let attrs = {
        id: indicator.id,
        label: indicator.name,
        shortcut: indicator.name.split(':')[0],
        isSelected: false,
      };
      if (selectedParticipant != undefined) {
        const participantIndicators = selectedParticipant.indicator_ids;
        for (let i=0; i<participantIndicators.length; i++) {
          if (participantIndicators[i] === indicator.id) {
            attrs['isSelected'] = true;
            selectedIndicators.push(attrs);
            break;
          }
        }
      }
      indicators.push(attrs);
    });
    indicators.push({label: 'Other indicator', id: '', shortcut: 'add', isSelectd: false})
    this.setState({selectedIndicators}, () => {this.props.selectIndicator();});
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
  criteriaShortcut: {
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