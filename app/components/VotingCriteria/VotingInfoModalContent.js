import React from 'react';
import { View, Text } from 'react-native';

import { LocalizationContext } from '../Translations';
import OutlineInfoIcon from '../OutlineInfoIcon';
import DashedLine from '../DashedLine';
import VotingParticipantInfo from './VotingParticipantInfo';
import VotingAverageScoreInfo from './VotingAverageScoreInfo';
import VotingMedianScoreInfo from './VotingMedianInfo';

import CustomStyle from '../../themes/customStyle';
import Color from '../../themes/color';
import { isVotingCriteriaRated } from '../../helpers/voting_criteria_helper';
import { titleFontSize } from '../../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import VotingInfoTabletStyles from '../../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

class VotingInfoModalContent extends React.Component {
  static contextType = LocalizationContext;

  renderVotingDetail() {
    return <React.Fragment>
            <Text numberOfLines={1} style={[CustomStyle.modalTitle, { fontSize: titleFontSize(), padding: containerPadding, paddingBottom: 5 }]}>
              { this.props.indicator && this.props.indicator.content }
            </Text>
            <DashedLine />

            <View style={{ padding: containerPadding }}>
              <VotingMedianScoreInfo criteria={this.props.criteria} />
              <VotingAverageScoreInfo votingInfos={this.props.votingInfos} />
              <VotingParticipantInfo scorecard={this.props.scorecard} />
            </View>
          </React.Fragment>
  }

  renderNoDataLabel() {
    return <View style={{flexDirection: 'row', padding: containerPadding}}>
            <OutlineInfoIcon color={Color.warningColor} />

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={responsiveStyles.normalText}>
                { this.context.translations.thereIsNoVotingYet }
              </Text>
            </View>
          </View>
  }

  render() {
    if (isVotingCriteriaRated(this.props.criteria.uuid))
      return this.renderVotingDetail();

    return this.renderNoDataLabel();
  }
}

export default VotingInfoModalContent;