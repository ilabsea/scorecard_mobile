import React from 'react';
import {View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import IndicatorList from './IndicatorList';
import VotingConfirmationHeader from './VotingConfirmationHeader';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';

import { votingConfirmationContentHeight } from '../../constants/modal_constant';
import { containerPadding } from '../../utils/responsive_util';
import { modalContentPaddingBottom } from '../../utils/component_util';

class VotingIndicatorFormConfirmation extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <View style={{backgroundColor: Color.whiteColor, height: hp(votingConfirmationContentHeight), paddingBottom: modalContentPaddingBottom(this.props.sdkVersion)}}>
        <VotingConfirmationHeader participantUuid={this.props.participantUuid} />

        <View style={{paddingHorizontal: containerPadding, paddingTop: 10, paddingBottom: 8, flex: 1}}>
          <IndicatorList scorecardUuid={this.props.scorecardUuid} indicators={this.props.indicators} />
        </View>
        <FormBottomSheetButton isValid={true} label={this.context.translations.confirmAndSave} save={() => this.props.onConfirm()} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    sdkVersion: state.sdkVersion
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VotingIndicatorFormConfirmation);