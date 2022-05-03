import React from 'react';

import PullToRefreshScrollView from '../PullToRefreshScrollView';
import VerticalProgressStep from './VerticalProgressStep';
import ScorecardProgressTitle from './ScorecardProgressTitle';
import scorecardSyncService from '../../services/scorecard_sync_service';
import { isScorecardInReview } from '../../utils/scorecard_util';
import { getDeviceStyle } from '../../utils/responsive_util';
import ScorecardProgressTabletStyles from '../../styles/tablet/ScorecardProgressScreenStyle';
import ScorecardProgressMobileStyles from '../../styles/mobile/ScorecardProgressScreenStyle';

const responsiveStyles = getDeviceStyle(ScorecardProgressTabletStyles, ScorecardProgressMobileStyles);

class ScorecardProgressScrollView extends React.Component {
  state = { isLoading: false };

  syncScorecard() {
    scorecardSyncService.syncScorecard(this.props.scorecard.uuid, (scorecard) => {
      this.setState({ isLoading: false });
      this.props.updateScorecard(scorecard);
    });
  }

  render() {
    return (
      <PullToRefreshScrollView
        containerStyle={responsiveStyles.container}
        allowPullToRefresh={isScorecardInReview(this.props.scorecard)}
        syncData={() => this.syncScorecard()}
        isLoading={this.state.isLoading}
        updateLoadingState={(isLoading) => this.setState({ isLoading })}
      >
        <ScorecardProgressTitle scorecard={this.props.scorecard} />

        <VerticalProgressStep
          progressIndex={this.props.scorecard.status || 3}
          scorecard={this.props.scorecard}
          hasValidOwnerAndEndpoint={this.props.hasValidOwnerAndEndpoint}
        />
      </PullToRefreshScrollView>
    )
  }
}

export default ScorecardProgressScrollView;