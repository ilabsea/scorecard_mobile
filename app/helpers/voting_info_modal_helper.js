import React from 'react';
import { View, Text } from 'react-native';

import VotingParticipantInfo from '../components/VotingIndicator/VotingParticipantInfo';
import VotingAverageScoreInfo from '../components/VotingIndicator/VotingAverageScoreInfo';
import VotingMedianScoreInfo from '../components/VotingIndicator/VotingMedianInfo';
import BottomSheetInfoTitle from '../components/Share/BottomSheetInfoTitle';
import BottomSheetModalTitle from '../components/BottomSheetModalTitle';

import { getVotingInfos, isVotingIndicatorRated } from './voting_indicator_helper';
import { getDeviceStyle, containerPadding, isShortScreenDevice } from '../utils/responsive_util';
import VotingInfoTabletStyles from '../styles/tablet/VotingInfoComponentStyle';
import VotingInfoMobileStyles from '../styles/mobile/VotingInfoComponentStyle';

const responsiveStyles = getDeviceStyle(VotingInfoTabletStyles, VotingInfoMobileStyles);

const votingInfoModalHelper = (() => {
  return {
    getModalContent,
    getModalSnapPoints
  }

  function getModalContent(scorecard, selectedIndicator, indicator, translations) {
    if (isVotingIndicatorRated(indicator.uuid))
      return _getVotingDetail(scorecard, selectedIndicator, indicator);

    return { first_content: _getNoDataContent(indicator, selectedIndicator, translations), second_content: null }
  }

  function getModalSnapPoints(scorecardUuid, indicatorId) {
    const mobileTwoLinesInfoSnapPoints = isShortScreenDevice() ? ['41%', '55.5%'] : ['38%', '51%'];
    const mobileThreeLinesInfoSnapPoints = isShortScreenDevice() ? ['46%', '65%'] : ['43%', '60.5%'];
    const moreInfoSnapPoints = {
      2: getDeviceStyle(['36%', '50%'], mobileTwoLinesInfoSnapPoints),
      3: getDeviceStyle(['41%', '58%'], mobileThreeLinesInfoSnapPoints)
    }

    const mobileLessInfoSnapPoints = isShortScreenDevice() ? ['44%'] : ['40.5%'];
    const lessInfoSnapPoints = getDeviceStyle(['42%'], mobileLessInfoSnapPoints);
    const votingInfos = getVotingInfos(scorecardUuid, indicatorId);

    return _hasLessInfo(votingInfos) ? lessInfoSnapPoints : moreInfoSnapPoints[_votingInfoLine(votingInfos)];
  }

  // private method
  function  _getVotingDetail(scorecard, selectedIndicator, indicator) {
    const votingInfos = getVotingInfos(scorecard.uuid, indicator.indicatorable_id);
    const hasLessInfo = _hasLessInfo(votingInfos);
    const votingParticipantInfo = <VotingParticipantInfo scorecard={scorecard} />;

    const firstContent = <React.Fragment>
                          <BottomSheetModalTitle title={`${indicator.order}. ${selectedIndicator && selectedIndicator.content}`} />
                          <View style={{ paddingHorizontal: containerPadding, paddingTop: 10 }}>
                            <VotingMedianScoreInfo indicator={indicator} />
                            <VotingAverageScoreInfo votingInfos={votingInfos} />
                            { hasLessInfo && votingParticipantInfo }
                          </View>
                        </React.Fragment>

    const secondContent = <View style={{ padding: containerPadding, paddingTop: 0 }}>
                            { votingParticipantInfo }
                          </View>

    return {
      first_content: firstContent,
      second_content: !hasLessInfo ? secondContent : null
    }
  }

  function _getNoDataContent(indicator, selectedIndicator, translations) {
    return <React.Fragment>
              <BottomSheetInfoTitle title={`${indicator.order}. ${selectedIndicator && selectedIndicator.content}`} />
              <View style={{flex: 1, justifyContent: 'center', padding: containerPadding}}>
                <Text style={responsiveStyles.normalText}>
                  { translations.thereIsNoVotingYet }
                </Text>
              </View>
           </React.Fragment>
  }

  function _votingInfoLine(votingInfos) {
    const votedInfos = votingInfos.filter(votingInfo => votingInfo.voting_score > 0);
    return Math.round(votedInfos.length / 2);
  }

  function _hasLessInfo(votingInfos) {
    return _votingInfoLine(votingInfos) < 2;
  }
})();

export default votingInfoModalHelper;