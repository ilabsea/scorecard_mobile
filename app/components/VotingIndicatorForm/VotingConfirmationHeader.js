import React from 'react';

import Color from '../../themes/color';
import {LocalizationContext} from '../Translations';
import BottomSheetInfoTitle from '../Share/BottomSheetInfoTitle';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';

import { containerPadding, getDeviceStyle, isShortWidthScreen } from '../../utils/responsive_util';
import { smallTextFontSize } from '../../utils/font_size_util';
import Participant from '../../models/Participant';

class VotingConfirmationHeader extends React.Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.participant = Participant.find(this.props.participantUuid);
  }

  renderParticipantInfo() {
    const orderNumberSize = getDeviceStyle(24, 22);
    return <ParticipantListItemInfo
              participant={this.participant}
              fontSize={isShortWidthScreen() ? 11 : smallTextFontSize()}
              hasArrowIcon={false}
              disabled={true}
              labelColor={Color.subText}
              containerStyle={{marginTop: -5}}
              customNumberContainerStyle={{width: orderNumberSize, height: orderNumberSize, backgroundColor: Color.subText}}
              customNumberLabelStyle={{fontSize: smallTextFontSize()}}
              customGenderStyle={{width: getDeviceStyle(50, 40)}}
           />
  }

  render() {
    return <BottomSheetInfoTitle title={this.context.translations.confirmYourVote}
            customContainerStyle={{marginTop: -6}}
            customTitleContainerStyle={{paddingVertical: containerPadding - getDeviceStyle(10, 5) }}
           >
              { this.renderParticipantInfo() }
           </BottomSheetInfoTitle>
  }
}

export default VotingConfirmationHeader;