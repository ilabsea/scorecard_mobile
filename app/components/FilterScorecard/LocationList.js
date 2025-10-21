import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FilterScorecardCheckIcon from './FilterScorecardCheckIcon';
import Color from '../../themes/color';
import listItemStyles from '../../themes/listItemStyle';
import uuidv4 from '../../utils/uuidv4';
import { bodyFontSize } from '../../utils/font_size_util';

import scorecardHelper from '../../helpers/scorecard_helper';
import locationHelper from '../../helpers/location_helper';
import { LocalizationContext } from '../Translations';
import { SELECTED_FILTERS } from '../../constants/main_constant';
import { FontFamily } from '../../assets/stylesheets/theme';

class LocationList extends Component {
  static contextType = LocalizationContext;
  constructor(props, context) {
    super(props);
    this.scorecardLocations = scorecardHelper.getScorecardLocations(context.appLanguage);

    this.state = {
      locations: this.scorecardLocations
    }
  }

  async componentDidMount() {
    let selectedFilters = await AsyncStorage.getItem(SELECTED_FILTERS);
    selectedFilters = JSON.parse(selectedFilters);

    if (selectedFilters && !!selectedFilters.provinces.length) {
      let locations = this.state.locations;

      locations.map(location => {
        selectedFilters.provinces.map(province => {
          if (location.label == province)
            location.isSelected = true;
        })
      });

      this.setState({ locations: locationHelper.getSortedLocation(locations, this.context.appLanguage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {appLanguage} = this.context;

    if (this.props.isReset) {
      this.props.updateIsReset();
      this.setState({ locations: scorecardHelper.getScorecardLocations(appLanguage) })
      return;
    }

    if(prevProps.searchedLocation != this.props.searchedLocation) {
      const newLocations = this.props.searchedLocation == '' ? locationHelper.getSortedLocation(this.scorecardLocations, appLanguage)
                          : this.scorecardLocations.filter(item => {
                            const label = locationHelper.getProvinceName(item.label, appLanguage).toLowerCase();
                            return label.includes(this.props.searchedLocation.toLowerCase())
                          });

      this.setState({locations: newLocations})
    }
  }

  onSelectItem(value) {
    this.props.onSelectItem(value);
    let locations = this.state.locations;

    this.state.locations.map((location, index) => {
      if (location.label == value)
        locations[index].isSelected = !locations[index].isSelected;
    });

    this.setState({ locations: locationHelper.getSortedLocation(locations, this.context.appLanguage) });
  }

  renderList() {
    return this.state.locations.map((location, index) => {
      return (
        <View key={uuidv4()}>
          <TouchableOpacity onPress={() => this.onSelectItem(location.label)}
            style={listItemStyles.filterListItem}
          >
            <Text style={{flex: 1, fontSize: bodyFontSize(), fontFamily: FontFamily.body, textTransform: 'capitalize'}}>
              { locationHelper.getProvinceName(location.label, this.context.appLanguage) }
            </Text>

            { location.isSelected && <FilterScorecardCheckIcon /> }
          </TouchableOpacity>
          { index < this.state.locations.length - 1 && <Divider style={{backgroundColor: '#b3b3b3'}} /> }
        </View>
      )
    });
  }

  render() {
    return (
      <View style={{backgroundColor: Color.whiteColor}}>
        { this.renderList() }
      </View>
    )
  }
}

export default LocationList;