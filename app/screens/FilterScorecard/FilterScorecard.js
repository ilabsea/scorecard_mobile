import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../../components/Translations';
import FilterOption from '../../components/FilterScorecard/FilterOption';
import LocationSearchBox from '../../components/FilterScorecard/LocationSearchBox';
import LocationList from '../../components/FilterScorecard/LocationList';
import FilterScorecardHeader from '../../components/FilterScorecard/FilterScorecardHeader';
import BottomButton from '../../components/BottomButton';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';
import { scorecardStatuses, scorecardTypes } from '../../constants/scorecard_constant';
import { SELECTED_FILTERS } from '../../constants/main_constant';

let _this = null;

class FilterScorecard extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    _this = this;

    this.state = {
      searchedProvince: '',
      selectedStatuses: [],
      selectedTypes: [],
      selectedProvinces: [],
      isSearchBoxFocused: false,
    }
  }

  async componentDidMount() {
    let selectedFilters = await AsyncStorage.getItem(SELECTED_FILTERS);
    selectedFilters = JSON.parse(selectedFilters);

    if (selectedFilters)
      this.setState({
        selectedStatuses: selectedFilters.statuses,
        selectedTypes: selectedFilters.types,
        selectedProvinces: selectedFilters.provinces,
      });
  }

  onChangeSearch(text) {
    _this.setState({ searchedProvince: text });
  }

  onSelectItem(type, value) {
    if (type == 'scorecard-status')
      _this.setState({ selectedStatuses: _this.getSelectedItem(_this.state.selectedStatuses, value) });
    else if (type == 'scorecard-type')
      _this.setState({ selectedTypes: _this.getSelectedItem(_this.state.selectedTypes, value) });
    else
      _this.setState({ selectedProvinces: _this.getSelectedItem(_this.state.selectedProvinces, value) });
  }

  getSelectedItem(selectedItems, value) {
    if (selectedItems.includes(value))
      return selectedItems.filter(item => item != value);

    return [...selectedItems, value];
  }

  async applyFilter() {
    const { selectedStatuses, selectedTypes, selectedProvinces } = this.state;
    const selectedFilters = {
      statuses: this.state.selectedStatuses,
      types: this.state.selectedTypes,
      provinces: this.state.selectedProvinces,
    };

    if (!!selectedStatuses.length || !!selectedTypes.length || !!selectedProvinces.length)
      AsyncStorage.setItem(SELECTED_FILTERS, JSON.stringify(selectedFilters));

    this.props.navigation.goBack();
  }

  resetFilter() {
    AsyncStorage.removeItem(SELECTED_FILTERS);

    this.setState({
      selectedStatuses: [],
      selectedTypes: [],
      selectedProvinces: [],
    });
  }

  render() {
    const { translations } = this.context;
    const titleSize = getDeviceStyle(16, wp(mdLabelSize));

    return (
      <View style={{flex: 1}}>
        <FilterScorecardHeader
          onBackPress={() => this.props.navigation.goBack()}
          resetFilter={() => this.resetFilter()}
        />

        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#eee', paddingBottom: this.state.isSearchBoxFocused ? 300 : 20 }}
          stickyHeaderIndices={[3]}
        >
          <FilterOption options={scorecardStatuses} title={translations.status}
            selectedItems={this.state.selectedStatuses}
            type='scorecard-status'
            onSelectItem={this.onSelectItem}
          />
          <FilterOption options={scorecardTypes} title={translations.scorecardType}
            selectedItems={this.state.selectedTypes}
            type='scorecard-type'
            onSelectItem={this.onSelectItem}
            containerStyle={{ marginTop: 20 }}
          />

          <Text style={{paddingHorizontal: 16, paddingVertical: 10, fontSize: titleSize, marginTop: 20, fontFamily: FontFamily.title, backgroundColor: Color.whiteColor}}>
            { translations.scorecardLocation }
          </Text>
          <LocationSearchBox
            searchedLocation={this.state.searchedProvince}
            onChangeText={this.onChangeSearch}
            onClearSearch={() => this.setState({ searchedProvince: '' })}
            updateFocusStatus={(isFocus) => this.setState({ isSearchBoxFocused: isFocus })}
          />

          <LocationList
            searchedLocation={this.state.searchedProvince}
            selectedItems={this.state.selectedProvinces}
            onSelectItem={this.onSelectItem}
          />
        </ScrollView>

        <View style={{padding: containerPadding, backgroundColor: Color.whiteColor, borderTopWidth: 0.5, borderTopColor: Color.paleGrayColor}}>
          <BottomButton
            customBackgroundColor={Color.headerColor}
            iconName='none'
            label={translations.apply}
            onPress={() => this.applyFilter()}
          />
        </View>
      </View>
    )
  }
}

export default FilterScorecard;