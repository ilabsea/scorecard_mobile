import React from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {LocalizationContext} from '../Translations';
import ProposeNewIndicatorSearchResultCardList from './ProposeNewIndicatorSearchResultCardList';
import ProposeNewIndicatorAddNewButton from './ProposeNewIndicatorAddNewButton';
import OutlinedButton from '../OutlinedButton';
import settingHelper from '../../helpers/setting_helper';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';
import proposedIndicatorStyleHelper from '../../helpers/proposed_indicator_style_helper';
import proposedIndicatorService from '../../services/proposed_indicator_service';
import Indicator from '../../models/Indicator';
import {participantModalSnapPoints} from '../../constants/modal_constant';
import { getDeviceStyle } from '../../utils/responsive_util';

class ProposeNewIndicatorSearchResult extends React.Component {
  static contextType = LocalizationContext;
  state = {showAddNewButton: false}

  async componentDidUpdate(prevProps) {
    const endpointId = await settingHelper.getSavedEndpointUrlId();
    if (!!this.props.searchedText && prevProps.searchedText != this.props.searchedText) {
      const duplicatedIndicators = Indicator.findByScorecardAndName(this.props.scorecardUuid, this.props.searchedText, endpointId);
      this.setState({showAddNewButton: duplicatedIndicators.length > 0 ? false : true})
    }
    else if (!this.props.searchedText)
      this.setState({showAddNewButton: false})
  }

  startProposeIndicator = (indicator, isNewCustomIndicator) => {
    if (this.props.isIndicatorBase) {
      this.props.bottomSheetRef.current?.setSnapPoints(participantModalSnapPoints)
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

  renderIndicators = () => {
    return <ScrollView contentContainerStyle={{paddingBottom: 30, paddingTop: 0, paddingHorizontal: 16}}>
              <ProposeNewIndicatorSearchResultCardList scorecardUuid={this.props.scorecardUuid} searchedText={this.props.searchedText} indicators={this.props.indicators}
                onPressItem={(indicator) => this.startProposeIndicator(indicator, false)}
                isIndicatorBase={this.props.isIndicatorBase} participantUuid={this.props.participantUuid}
                playingUuid={this.props.playingUuid} updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
              />
           </ScrollView>
  }

  renderSaveBtn = () => {
    return <OutlinedButton
              label={this.context.translations.confirmAndSave}
              buttonStyle={{marginBottom: getDeviceStyle(20, 16), marginHorizontal: 16, height: 56}}
              labelStyle={{textAlign: 'center', fontSize: getDeviceStyle(18, 16), paddingLeft: 0, flex: 1}}
              hideIcon={true}
              onPress={() => this.props.closeSearch()}
           />
  }

  render() {
    return (
      <React.Fragment>
        <View style={proposedIndicatorStyleHelper.getSearchResultStyles(this.props.isIndicatorBase, this.props.searchContainerHeight)}>
          {this.renderIndicators()}
          {(!!this.props.searchedText && this.state.showAddNewButton) &&
            <ProposeNewIndicatorAddNewButton scorecardUuid={this.props.scorecardUuid} searchedText={this.props.searchedText} isIndicatorBase={this.props.isIndicatorBase} participantUuid={this.props.participantUuid}
              startProposeIndicator={(customIndicator) => this.startProposeIndicator(customIndicator, true)}
            />
          }
          {(!this.props.isIndicatorBase && !this.state.showAddNewButton) && this.renderSaveBtn()}
        </View>
        <TouchableWithoutFeedback onPress={() => this.props.closeSearch()}>
          <View style={{position: 'absolute', height: hp('100%'), width: wp('100%'), zIndex: -1}} />
        </TouchableWithoutFeedback>
      </React.Fragment>
    )
  }
}

export default ProposeNewIndicatorSearchResult