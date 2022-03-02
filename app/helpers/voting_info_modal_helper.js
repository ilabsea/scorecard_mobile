import React from 'react';
import { View, Text } from 'react-native';

import OutlineInfoIcon from '../components/OutlineInfoIcon';
import DashedLine from '../components/DashedLine';
import VotingParticipantInfo from '../components/VotingCriteria/VotingParticipantInfo';
import VotingAverageScoreInfo from '../components/VotingCriteria/VotingAverageScoreInfo';
import VotingMedianScoreInfo from '../components/VotingCriteria/VotingMedianInfo';

import CustomStyle from '../themes/customStyle';
import Color from '../themes/color';
import { getVotingInfos, isVotingCriteriaRated } from './voting_criteria_helper';
import indicatorHelper from './indicator_helper';
import { titleFontSize } from '../utils/font_size_util';
import { getDeviceStyle, containerPadding } from '../utils/responsive_util';
import VotingInfoTabletStyles from '../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

const votingInfoModalHelper = (() => {
  return {
    getModalContent
  }

  function getModalContent(scorecard, indicator, criteria, translations) {
    if (isVotingCriteriaRated(criteria.uuid))
      return _getVotingDetail(scorecard, indicator, criteria);

    return { first_content: _getNoDataContent(translations), second_content: null }
  }

  // private method
  function  _getVotingDetail(scorecard, indicator, criteria) {
    const indicatorId = indicatorHelper.getIndicatorId(indicator);
    const votingInfos = getVotingInfos(scorecard.uuid, indicatorId);

    const firstContent = <React.Fragment>
                          <Text numberOfLines={1} style={[CustomStyle.modalTitle, { fontSize: titleFontSize(), padding: containerPadding, paddingBottom: 5 }]}>
                            { indicator && indicator.content }
                          </Text>
                          <DashedLine />

                          <View style={{ padding: containerPadding, paddingBottom: 0 }}>
                            <VotingMedianScoreInfo criteria={criteria} />
                            <VotingAverageScoreInfo votingInfos={votingInfos} />
                          </View>
                        </React.Fragment>

    return {
      first_content: firstContent,
      second_content: <VotingParticipantInfo scorecard={scorecard} />
    }
  }

  function _getNoDataContent(translations) {
    return <View style={{flexDirection: 'row', padding: containerPadding}}>
            <OutlineInfoIcon color={Color.warningColor} />

            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={responsiveStyles.normalText}>
                { translations.thereIsNoVotingYet }
              </Text>
            </View>
          </View>
  }
})();

export default votingInfoModalHelper;