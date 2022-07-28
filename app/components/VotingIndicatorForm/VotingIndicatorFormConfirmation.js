import React from 'react';
import {View} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import IndicatorList from './IndicatorList';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import BottomSheetInfoTitle from '../Share/BottomSheetInfoTitle';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';

import { votingConfirmationContentHeight } from '../../constants/modal_constant';
import { containerPadding } from '../../utils/responsive_util';
import { smallTextFontSize } from '../../utils/font_size_util';
import Participant from '../../models/Participant';

class VotingIndicatorFormConfirmation extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.participant = Participant.find(this.props.participantUuid);
  }

  renderParticipantInfo() {
    return <ParticipantListItemInfo
              participant={this.participant} fontSize={12} hasArrowIcon={false}
              disabled={true}
              containerStyle={{marginTop: -5}}
              customNumberContainerStyle={{width: 24, height: 24, backgroundColor: Color.subText}}
              customNumberLabelStyle={{fontSize: smallTextFontSize()}}
              labelColor={Color.subText}
           />
  }

  renderHeader() {
    return <BottomSheetInfoTitle title={this.context.translations.confirmYourVote}
            customContainerStyle={{marginTop: -6}}
            customTitleContainerStyle={{paddingVertical: containerPadding - 10 }}
           >
              { this.renderParticipantInfo() }
           </BottomSheetInfoTitle>
  }

  render() {
    return (
      <View style={{backgroundColor: Color.whiteColor, height: hp(votingConfirmationContentHeight)}}>
        { this.renderHeader() }

        <View style={{paddingHorizontal: containerPadding, paddingTop: 10, flex: 1}}>
          <IndicatorList scorecardUuid={this.props.scorecardUuid} indicators={this.props.indicators} />
        </View>
        <FormBottomSheetButton isValid={true} label={this.context.translations.confirmAndSave} save={() => this.props.onConfirm()} />
      </View>
    )
  }
}

export default VotingIndicatorFormConfirmation;