import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorCard from './IndicatorCard';
import IndicatorAudioButton from './IndicatorAudioButton';

class IndicatorSelectionItems extends Component {
  static contextType = LocalizationContext;
  state = {
    playingIndicatorId: null,
  }

  participantModalRef = React.createRef();
  formModalRef = React.createRef();

  audioButton = (indicator) => {
    return <IndicatorAudioButton indicator={indicator} scorecardUUID={this.props.scorecardUuid}
              playingIndicatorId={this.state.playingIndicatorId}
              updatePlayingIndicatorId={(indicatorId) => this.setState({playingIndicatorId: indicatorId})}
           />
  }

  renderIndicatorCard(indicator, index) {
    const itemKey = 'indicator-card-' + index;

    return (
      <IndicatorCard
        indicator={indicator}
        index={index}
        scorecardUuid={this.props.scorecardUuid}
        key={itemKey}
        customCardStyle={this.props.customCardStyle}
        participantUuid={this.props.participantUuid}
        isEdit={this.props.isEdit}
        isPopupModalList={!!this.props.isPopupModalList}
        isIndicatorBase={this.props.isIndicatorBase}
        isExistedIndicator={this.props.isExistedIndicator}
        updateIndicatorList={() => this.props.updateIndicatorList()}
        selectForEdit={() => this.props.selectForEdit(indicator)}
        formModalRef={this.props.formModalRef}
        participantModalRef={this.props.participantModalRef}
      >
        {this.audioButton(indicator)}
      </IndicatorCard>
    )
  }

  render() {
    return (
      <View style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 2, paddingTop: 5, paddingTop: 15}}>
        {
          this.props.indicators.map((indicator, index) => {
            return this.renderIndicatorCard(indicator, index)
          })
        }
      </View>
    )
  }
}

export default IndicatorSelectionItems;
