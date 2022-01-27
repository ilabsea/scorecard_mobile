import React from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import ListSectionTitle from '../ListSectionTitle';
import ScorecardListItem from './ScorecardListItem';
import PullToRefreshScrollView from '../PullToRefreshScrollView';

import scorecardHelper from '../../helpers/scorecard_helper';
import { getListStickyIndices } from '../../utils/scorecard_util';
import uuidv4 from '../../utils/uuidv4';
import scorecardSyncService from '../../services/scorecard_sync_service';

class ScorecardListScrollView extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    }
  }

  renderScorecardItems(scorecards) {
    return (scorecards.map(scorecard => (
        <ScorecardListItem key={uuidv4()}
          onPress={() => this.props.selectScorecard(scorecard)}
          scorecard={scorecard}
          showDeleteModal={() => this.props.showDeleteModal(scorecard)}
        />
      )
    ));
  }

  renderProgressScorecards(scorecards) {
    return <View key={uuidv4()}>{ this.renderScorecardItems(scorecards) }</View>
  }

  renderFinishedScorecards(finishedScorecards) {
    let doms = [];

    for (let i = 0; i<finishedScorecards.length; i++) {
      const date = scorecardHelper.getTranslatedDate(finishedScorecards[i].date, this.context.appLanguage, 'MMM YYYY');

      doms.push(<ListSectionTitle title={date} key={uuidv4()} />)
      doms.push(<View key={uuidv4()}>{this.renderScorecardItems(finishedScorecards[i].scorecards)}</View>);
    }

    return doms;
  }

  render() {
    const { translations } = this.context;
    const progressScorecards = this.props.scorecards.filter(s => !s.finished); 
    let finishedScorecards = this.props.scorecards.filter(s => s.finished);
    finishedScorecards = scorecardHelper.getGroupedByDate(finishedScorecards);

    return (
      <PullToRefreshScrollView
        containerStyle={{ flexGrow: 1, paddingBottom: 0, marginBottom: 0 }}
        stickyIndices={getListStickyIndices(finishedScorecards)}
        allowPullToRefresh={true}
        syncData={() => scorecardSyncService.syncScorecardsInReview(() => this.setState({ isLoading: false }))}
        isLoading={this.state.isLoading}
        updateLoadingState={(isLoading) => this.setState({ isLoading })}
      >
        { !!progressScorecards.length && <ListSectionTitle title={translations.progressScorecards} /> }
        { !!progressScorecards.length && this.renderProgressScorecards(progressScorecards) }
        { this.renderFinishedScorecards(finishedScorecards) }
      </PullToRefreshScrollView>
    )
  }
}

export default ScorecardListScrollView;