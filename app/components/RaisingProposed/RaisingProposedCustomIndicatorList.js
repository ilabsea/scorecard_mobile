import React, {Component} from 'react';

import {LocalizationContext} from '../Translations';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import IndicatorSelectionItems from './IndicatorSelectionItems';
import NoIndicatorMessage from './NoIndicatorMessage';
class RaisingProposedCustomIndicatorList extends Component {
  static contextType = LocalizationContext;

  renderInidcatorList() {
    return (
      <RaisingProposedScrollView>
        <IndicatorSelectionItems
          indicators={this.props.indicators}
          isSearching={this.props.isSearching}
          isEdit={true}
          scorecardUuid={this.props.scorecardUuid}
          selectForEdit={(indicator) => this.props.selectForEdit(indicator)}
          updateIndicatorList={() => this.props.updateIndicatorList()}
        />
      </RaisingProposedScrollView>
    )
  }

  render() {
    return (
      this.props.indicators.length > 0
        ? this.renderInidcatorList()
        : <NoIndicatorMessage />
    )
  }
}

export default RaisingProposedCustomIndicatorList;