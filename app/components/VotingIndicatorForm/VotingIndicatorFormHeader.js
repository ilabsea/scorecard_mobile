import React from 'react';
import { Body } from 'native-base';

import Color from '../../themes/color';
import { LocalizationContext } from '../Translations';
import ParticipantListItemInfo from '../Share/ParticipantListItemInfo';

import HeaderWithDiscardAlert from '../Share/HeaderWithDiscardAlert';
import { getDeviceStyle } from '../../utils/responsive_util';

class VotingIndicatorFormHeader extends React.Component {
  static contextType = LocalizationContext;

  render() {
    return (
      <HeaderWithDiscardAlert
        title={this.context.translations.newVoting}
        modalTitle={this.context.translations.discardTheVoting}
        modalDescription={this.context.translations.areYouSureYouWantToDiscardThisVoting}
        hasDiscardAlert={() => this.props.indicators.filter(indicator => indicator.ratingScore).length > 0}
        hideRightComponent={true}
      >
        { this.props.participantInfoTitleVisible &&
          <Body style={{flex: getDeviceStyle(2, 1),marginLeft: getDeviceStyle(0, -20)}}>
            <ParticipantListItemInfo
              participant={this.props.participant}
              labelColor={Color.whiteColor}
            />
          </Body>
        }
      </HeaderWithDiscardAlert>
    )
  }
}

export default VotingIndicatorFormHeader;