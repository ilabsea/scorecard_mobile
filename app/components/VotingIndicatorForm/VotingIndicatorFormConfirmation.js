import React from 'react';
import {View, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import BottomSheetInfoTitle from '../Share/BottomSheetInfoTitle';

import { votingConfirmationContentHeight } from '../../constants/modal_constant';
import { containerPadding } from '../../utils/responsive_util';
import { bodyFontSize } from '../../utils/font_size_util';

class VotingIndicatorFormConfirmation extends React.Component {
  static contextType = LocalizationContext;

  renderText(text) {
    return <Text style={{fontSize: bodyFontSize(), marginBottom: 2}}>{ text }</Text>
  }

  render() {
    const { translations } = this.context;
    return (
      <View style={{backgroundColor: Color.whiteColor, height: hp(votingConfirmationContentHeight)}}>
        <BottomSheetInfoTitle title={translations.saveTheVoting} />
        <View style={{padding: containerPadding, flex: 1}}>
          { this.renderText(translations.doYouWantToSaveThisVoting) }
          { this.renderText(translations.afterSavingYouWillNotMakeUpdate) }
          { this.renderText(translations.pleaseCheckVotingBeforeSaving) }
        </View>
        <FormBottomSheetButton isValid={true} label={translations.confirm} save={() => this.props.onConfirm()} />
      </View>
    )
  }
}

export default VotingIndicatorFormConfirmation;