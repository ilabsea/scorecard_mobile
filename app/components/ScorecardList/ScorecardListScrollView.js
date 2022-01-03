import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';

import { LocalizationContext } from '../Translations';
import ListSectionTitle from '../ListSectionTitle';
import ScorecardListItem from './ScorecardListItem';

import scorecardHelper from '../../helpers/scorecard_helper';
import { getListStickyIndices } from '../../utils/scorecard_util';
import uuidv4 from '../../utils/uuidv4';

class ScorecardListScrollView extends React.Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      selectedScorecard: null,
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
    return (
      <View key={uuidv4()}>
        { this.renderScorecardItems(scorecards) }
      </View>
    )
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
      <ScrollView contetnContainerStyle={{flexGrow: 1, paddingBottom: 0, marginBottom: 0}} stickyHeaderIndices={getListStickyIndices(finishedScorecards)}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isLoading}
            onRefresh={() => {
              console.log('sync scorecard')
            }}
          />
        }
      >
        { !!progressScorecards.length && <ListSectionTitle title={translations.progressScorecards} /> }
        { !!progressScorecards.length && this.renderProgressScorecards(progressScorecards) }
        { this.renderFinishedScorecards(finishedScorecards) }

      </ScrollView>
    )
  }
}

export default ScorecardListScrollView;