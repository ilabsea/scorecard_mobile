import React from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import ProposeNewIndicatorSearchResultCardList from './ProposeNewIndicatorSearchResultCardList';
import ProposeNewIndicatorAddNewButton from './ProposeNewIndicatorAddNewButton';
import Color from '../../themes/color';
import settingHelper from '../../helpers/setting_helper';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import Indicator from '../../models/Indicator';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import {participantListModalSnapPoints} from '../../constants/modal_constant';

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

  startProposeIndicator = (indicator, isNewCustomIndicator) => {
    this.props.bottomSheetRef.current?.setSnapPoints(participantListModalSnapPoints)

    if (this.props.isIndicatorBase) {
      this.props.closeSearch()
      const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: indicator };
      proposedIndicatorHelper.showFormModal(this.props.bottomSheetRef, this.props.formModalRef, proposedIndicatorParams);
    }
    else {
      !!isNewCustomIndicator && this.props.closeSearch()
      proposedIndicatorService.handleCreateAndRemoveIndicator(this.props.scorecardUuid, indicator, this.props.participantUuid);
      setTimeout(() => {
        this.props.updateProposedIndicator()
      }, 200)
    }
  }

  render() {
    return (
      <React.Fragment>
        <TouchableWithoutFeedback>
          <View style={{maxHeight: getDeviceStyle(hp('65%'), hp('60%')), backgroundColor: Color.whiteColor, borderRadius: 10, position: 'absolute', zIndex: 2, width: '100%', left: containerPadding + 1, top: this.props.searchContainerHeight + 15}}>
            <ScrollView contentContainerStyle={{paddingBottom: 30, paddingTop: 0, paddingHorizontal: 16}}>
              <ProposeNewIndicatorSearchResultCardList scorecardUuid={this.props.scorecardUuid} searchedText={this.props.searchedText} indicators={this.props.indicators}
                onPressItem={(indicator) => this.startProposeIndicator(indicator, false)}
                isIndicatorBase={this.props.isIndicatorBase} participantUuid={this.props.participantUuid}
                playingUuid={this.props.playingUuid} updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
              />
            </ScrollView>
            {(!!this.props.searchedText && this.state.showAddNewButton) &&
              <ProposeNewIndicatorAddNewButton scorecardUuid={this.props.scorecardUuid} searchedText={this.props.searchedText} isIndicatorBase={this.props.isIndicatorBase} participantUuid={this.props.participantUuid}
                startProposeIndicator={(customIndicator) => this.startProposeIndicator(customIndicator, true)}
              />
            }
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