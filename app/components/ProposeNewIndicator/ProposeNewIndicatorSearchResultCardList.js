import React from 'react';

import {LocalizationContext} from '../Translations';
import ProposeNewIndicatorCardItem from './ProposeNewIndicatorCardItem';
import Color from '../../themes/color';
import ProposedIndicator from '../../models/ProposedIndicator';
import Scorecard from '../../models/Scorecard';
import {OFFLINE} from '../../constants/scorecard_constant';

class ProposeNewIndicatorSearchResultCardList extends React.Component {
  static contextType = LocalizationContext;
  renderResult = () => {
    const scorecard = Scorecard.find(this.props.scorecardUuid);
    return this.props.indicators.map(indicator => {
      const proposedIndicator = this.props.isIndicatorBase ? ProposedIndicator.findByIndicator(this.props.scorecardUuid, indicator.indicatorable_id)[0]
                                  : ProposedIndicator.findByParticipant(this.props.scorecardUuid, indicator.indicatorable_id, this.props.participantUuid)
      const proposedStyle = !!proposedIndicator ? {borderColor: Color.clickableColor, borderWidth: 2} : {}

      return <ProposeNewIndicatorCardItem key={indicator.uuid} scorecardUuid={this.props.scorecardUuid} audio={null} searchedText={this.props.searchedText}
                indicatorName={indicator.name} indicatorableId={indicator.indicatorable_id} indicatorType={indicator.type} indicatorUuid={indicator.indicator_uuid}
                isIndicatorBase={this.props.isIndicatorBase}
                containerStyle={proposedStyle}
                onPressItem={() => this.props.onPressItem(indicator)}
                isSwipeable={false}
                playingUuid={this.props.playingUuid}
                isOffline={scorecard.running_mode == OFFLINE}
                updatePlayingUuid={(uuid) => this.props.updatePlayingUuid(uuid)}
             />
    })
  }

  render() {
    return this.renderResult()
  }
}

export default ProposeNewIndicatorSearchResultCardList