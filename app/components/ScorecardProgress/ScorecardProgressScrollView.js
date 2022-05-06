import React from 'react';

import PullToRefreshScrollView from '../PullToRefreshScrollView';
import VerticalProgressStep from './VerticalProgressStep';
import ScorecardProgressTitle from './ScorecardProgressTitle';
import scorecardSyncService from '../../services/scorecard_sync_service';
import { getDeviceStyle } from '../../utils/responsive_util';
import { INDICATOR_DEVELOPMENT } from '../../constants/scorecard_step_constant';
import Scorecard from '../../models/Scorecard'
import ScorecardProgressTabletStyles from '../../styles/tablet/ScorecardProgressScreenStyle';
import ScorecardProgressMobileStyles from '../../styles/mobile/ScorecardProgressScreenStyle';

const responsiveStyles = getDeviceStyle(ScorecardProgressTabletStyles, ScorecardProgressMobileStyles);

class ScorecardProgressScrollView extends React.Component {
  state = {
    isLoading: false,
    isRefreshable: false
  };

  async componentDidMount() {
    this.setState({ isRefreshable: await Scorecard.isRefreshable(this.props.scorecard) });
  }

  syncScorecard() {
    scorecardSyncService.syncScorecard(this.props.scorecard.uuid, (scorecard) => {
      this.setState({ isLoading: false });
      this.props.updateScorecard(scorecard);
      this.props.updateSyncStatus(false);
    }, (error) => this.setState({ isLoading: false }));
  }

  updateLoadingState(isLoading) {
    this.setState({ isLoading })
    this.props.updateSyncStatus(isLoading);
  }

  render() {
    return (
      <PullToRefreshScrollView
        containerStyle={responsiveStyles.container}
        allowPullToRefresh={this.state.isRefreshable}
        syncData={() => this.syncScorecard()}
        isLoading={this.state.isLoading}
        updateLoadingState={(isLoading) => this.updateLoadingState(isLoading)}
      >
        <ScorecardProgressTitle scorecard={this.props.scorecard} />

        <VerticalProgressStep
          progressStep={this.props.scorecard.status || INDICATOR_DEVELOPMENT}
          scorecard={this.props.scorecard}
          navigation={this.props.navigation}
          isEditable={this.props.isEditable}
        />
      </PullToRefreshScrollView>
    )
  }
}

export default ScorecardProgressScrollView;