import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import AppIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import { getDeviceStyle } from '../../utils/responsive_util';
import { mdLabelSize } from '../../constants/mobile_font_size_constant';
import uuidv4 from '../../utils/uuidv4';

import scorecardHelper from '../../helpers/scorecard_helper';
import locationHelper from '../../helpers/location_helper';
import { LocalizationContext } from '../Translations';
import { SELECTED_FILTERS } from '../../constants/main_constant';

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
            style={{flexDirection: 'row', paddingRight: 25, paddingLeft: 30, paddingVertical: 10, alignItems: 'center'}}
          >
            <Text style={{flex: 1, fontSize: getDeviceStyle(16, wp(mdLabelSize)), textTransform: 'capitalize'}}>
              { locationHelper.getProvinceName(location.label, this.context.appLanguage) }
            </Text>

            { location.isSelected && <AppIcon name='check-circle' size={24} color={Color.successColor} /> }
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