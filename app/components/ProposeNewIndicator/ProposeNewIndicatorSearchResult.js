import React from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import ProposeNewIndicatorSearchResultCardList from './ProposeNewIndicatorSearchResultCardList';
import ProposeNewIndicatorAddNewButton from './ProposeNewIndicatorAddNewButton';
import Color from '../../themes/color';
import settingHelper from '../../helpers/setting_helper';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import Indicator from '../../models/Indicator';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';

class ProposeNewIndicatorSearchResult extends React.Component {
  static contextType = LocalizationContext;
  state = {showAddNewButton: false}

  async componentDidUpdate(prevProps) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    if (!!this.props.searchedText && prevProps.searchedText != this.props.searchedText) {
      const duplicatedIndicators = Indicator.findByScorecardAndName(this.props.scorecardUuid, this.props.searchedText, endpointId);
      this.setState({showAddNewButton: duplicatedIndicators.length > 0 ? false : true})
    }
  }

  onPressItem = (indicator) => {
    this.props.closeSearch()
    const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: indicator };
    proposedIndicatorHelper.showFormModal(this.props.bottomSheetRef, this.props.formModalRef, proposedIndicatorParams);
  }

  render() {
    return (
      <React.Fragment>
        <TouchableWithoutFeedback>
          <View style={{maxHeight: getDeviceStyle(hp('65%'), hp('60%')), backgroundColor: Color.whiteColor, borderRadius: 10, position: 'absolute', zIndex: 1, width: '100%', left: containerPadding + 1, top: this.props.searchContainerHeight + 15}}>
            <ScrollView contentContainerStyle={{paddingBottom: 30, paddingTop: 0, paddingHorizontal: 16}}>
              <ProposeNewIndicatorSearchResultCardList scorecardUuid={this.props.scorecardUuid} searchedText={this.props.searchedText} indicators={this.props.indicators}
                onPressItem={(indicator) => this.onPressItem(indicator)}
              />
            </ScrollView>
            {(!!this.props.searchedText && this.state.showAddNewButton) && <ProposeNewIndicatorAddNewButton searchedText={this.props.searchedText} />}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.props.closeSearch()}>
          <View style={{position: 'absolute', height: hp('100%'), width: wp('100%'), backgroundColor: 'rgba(0,0,0,0.7)', zIndex: -1}} />
        </TouchableWithoutFeedback>
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchResult