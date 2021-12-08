import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';

import { LocalizationContext } from '../../components/Translations';
import LocationSearchBox from '../../components/FilterScorecard/LocationSearchBox';
import LocationList from '../../components/FilterScorecard/LocationList';
import FilterScorecardHeader from '../../components/FilterScorecard/FilterScorecardHeader';
import FilterScorecardStatusAndTypeOptions from '../../components/FilterScorecard/FilterScorecardStatusAndTypeOptions';
import FilterScorecardApplyButton from '../../components/FilterScorecard/FilterScorecardApplyButton';

import { FontFamily } from '../../assets/stylesheets/theme/font';
import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';
import { SELECTED_FILTERS } from '../../constants/main_constant';
import scorecardFilterService from '../../services/scorecard_filter_service';

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
      isReset: false,
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

  getSelectedItem(selectedItems, value) {
    if (selectedItems.includes(value))
      return selectedItems.filter(item => item != value);

    return [...selectedItems, value];
  }

  applyFilter() {
    const { selectedStatuses, selectedTypes, selectedProvinces } = this.state;

    scorecardFilterService.saveSelectedFilter(selectedStatuses, selectedTypes, selectedProvinces);
    this.props.navigation.goBack();
  }

  resetFilter() {
    this.setState({
      searchedProvince: '',
      selectedStatuses: [],
      selectedTypes: [],
      selectedProvinces: [],
      isReset: true,
    });
  }

  onSelectItem(selectedItems) {
    let options = selectedItems;
    options.isReset = false;

    _this.setState(options);
  }

  renderScorecardStatusAndTypeOptions() {
    return (
      <FilterScorecardStatusAndTypeOptions
        selectedStatuses={this.state.selectedStatuses}
        selectedTypes={this.state.selectedTypes}
        onSelectItem={this.onSelectItem}
        getSelectedItem={this.getSelectedItem}
      />
    )
  }

  renderLocationSearchBox() {
    return (
      <LocationSearchBox
        searchedLocation={this.state.searchedProvince}
        onChangeText={(text) => this.setState({ searchedProvince: text, isReset: false })}
        onClearSearch={() => this.setState({ searchedProvince: '' })}
        updateFocusStatus={(isFocus) => this.setState({ isSearchBoxFocused: isFocus })}
      />
    )
  }

  renderLocationList() {
    return (
      <LocationList
        searchedLocation={this.state.searchedProvince}
        selectedItems={this.state.selectedProvinces}
        onSelectItem={(value) => this.onSelectItem({selectedProvinces: _this.getSelectedItem(_this.state.selectedProvinces, value)})}
        isReset={this.state.isReset}
        updateIsReset={() => this.setState({isReset: false})}
      />
    )
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{flex: 1}}>
        <FilterScorecardHeader onBackPress={() => this.props.navigation.goBack()} resetFilter={() => this.resetFilter()} />
        <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: this.state.isSearchBoxFocused ? 300 : 20 }} stickyHeaderIndices={[2]}>
          { this.renderScorecardStatusAndTypeOptions() }

          <Text style={{paddingHorizontal: 16, paddingVertical: 10, fontSize: getDeviceStyle(16, wp(mdLabelSize)), marginTop: 20, fontFamily: FontFamily.title, backgroundColor: Color.whiteColor, height: 49}}>
            { translations.scorecardLocation }
          </Text>

          { this.renderLocationSearchBox() }
          { this.renderLocationList() }
        </ScrollView>

        <FilterScorecardApplyButton applyFilter={() => this.applyFilter()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingHorizontal: 16, paddingVertical: 10, fontSize: getDeviceStyle(16, wp(mdLabelSize)),
    marginTop: 20, fontFamily: FontFamily.title, backgroundColor: Color.whiteColor, height: 48
  }
});

export default FilterScorecard;