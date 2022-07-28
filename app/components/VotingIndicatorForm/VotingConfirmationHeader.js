import React from 'react';
import {View} from 'react-native';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import BottomSheetInfoTitle from '../Share/BottomSheetInfoTitle';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';

import { containerPadding } from '../../utils/responsive_util';
import { smallTextFontSize } from '../../utils/font_size_util';
import Participant from '../../models/Participant';

class VotingConfirmationHeader extends React.Component {
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

  render() {
    return <BottomSheetInfoTitle title={this.context.translations.confirmYourVote}
            customContainerStyle={{marginTop: -6}}
            customTitleContainerStyle={{paddingVertical: containerPadding - 10 }}
           >
              { this.renderParticipantInfo() }
           </BottomSheetInfoTitle>
  }
}

export default VotingConfirmationHeader;