import React from 'react';
import { View, Text } from 'react-native';

import OutlineInfoIcon from '../components/OutlineInfoIcon';
import DashedLine from '../components/DashedLine';
import VotingParticipantInfo from '../components/VotingIndicator/VotingParticipantInfo';
import VotingAverageScoreInfo from '../components/VotingIndicator/VotingAverageScoreInfo';
import VotingMedianScoreInfo from '../components/VotingIndicator/VotingMedianInfo';

import CustomStyle from '../themes/customStyle';
import Color from '../themes/color';
import { getVotingInfos, isVotingIndicatorRated } from './voting_indicator_helper';
import indicatorHelper from './indicator_helper';
import { titleFontSize } from '../utils/font_size_util';
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

  function getModalSnapPoints(scorecardUuid, indicator) {
    const mobileTwoLinesInfoSnapPoints = isShortScreenDevice() ? ['41%', '55.5%'] : ['38%', '51%'];
    const mobileThreeLinesInfoSnapPoints = isShortScreenDevice() ? ['46%', '65%'] : ['43%', '60.5%'];
    const moreInfoSnapPoints = {
      2: getDeviceStyle(['36%', '50%'], mobileTwoLinesInfoSnapPoints),
      3: getDeviceStyle(['41%', '58%'], mobileThreeLinesInfoSnapPoints)
    }

    const mobileLessInfoSnapPoints = isShortScreenDevice() ? ['44%'] : ['40.5%'];
    const lessInfoSnapPoints = getDeviceStyle(['42%'], mobileLessInfoSnapPoints);
    const indicatorId = indicatorHelper.getIndicatorId(indicator);
    const votingInfos = getVotingInfos(scorecardUuid, indicatorId);

    return _hasLessInfo(votingInfos) ? lessInfoSnapPoints : moreInfoSnapPoints[_votingInfoLine(votingInfos)];
  }

  // private method
  function _modalTitle(order, indicator, customStyle) {
    return <Text numberOfLines={1} style={[CustomStyle.modalTitle, { fontSize: titleFontSize(), padding: containerPadding, flex: 1 }, customStyle]}>
            {order}. { indicator && indicator.content }
           </Text>
  }

  function  _getVotingDetail(scorecard, selectedIndicator, indicator) {
    const indicatorId = indicatorHelper.getIndicatorId(selectedIndicator);
    const votingInfos = getVotingInfos(scorecard.uuid, indicatorId);
    const hasLessInfo = _hasLessInfo(votingInfos);
    const votingParticipantInfo = <VotingParticipantInfo scorecard={scorecard} />;

    const firstContent = <React.Fragment>
                          { _modalTitle(indicator.order, selectedIndicator, { paddingBottom: 0 }) }
                          <DashedLine />

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
              <View style={{flexDirection: 'row', paddingHorizontal: containerPadding, justifyContent: 'center', alignItems: 'center'}}>
                <OutlineInfoIcon color={Color.warningColor} customIconContainerStyles={{ marginTop: -10 }} />
                { _modalTitle(indicator.order, selectedIndicator, { paddingLeft: 0, paddingBottom: 5 }) }
              </View>
              <DashedLine />

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