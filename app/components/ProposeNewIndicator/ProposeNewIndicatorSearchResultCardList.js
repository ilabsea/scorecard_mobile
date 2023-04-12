import React from 'react';

import {LocalizationContext} from '../Translations';
import ProposeNewIndicatorCardItem from './ProposeNewIndicatorCardItem';
import Color from '../../themes/color';
import ProposedIndicator from '../../models/ProposedIndicator';

class ProposeNewIndicatorSearchResultCardList extends React.Component {
  static contextType = LocalizationContext;
  renderResult = () => {
    return this.props.indicators.map(indicator => {
      const proposedStyle = ProposedIndicator.findByIndicator(this.props.scorecardUuid, indicator.indicatorable_id).length > 0 ? {borderColor: Color.clickableColor, borderWidth: 2} : {}
      return <ProposeNewIndicatorCardItem key={indicator.uuid} scorecardUuid={this.props.scorecardUuid} audio={null} searchedText={this.props.searchedText}
                indicatorName={indicator.name} indicatorableId={indicator.indicatorable_id} indicatorType={indicator.type}
                containerStyle={proposedStyle}
                onPressItem={() => this.props.onPressItem(indicator)}
             />
    })
  }

  render() {
    return this.renderResult()
  }
}

export default ProposeNewIndicatorSearchResultCardList