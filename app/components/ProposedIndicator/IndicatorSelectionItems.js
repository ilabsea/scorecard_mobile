import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorCard from './IndicatorCard';
import IndicatorAudioButton from './IndicatorAudioButton';

class IndicatorSelectionItems extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.audioPlayer = null;
    this.state = {
      playingIndicatorId: null,
    }
  }

  componentWillUnmount() {
    if (this.audioPlayer != null)
      this.audioPlayer.release();
  }

  updateAudioState = (indicatorId, audioPlayer) => {
    this.setState({playingIndicatorId: indicatorId});
    this.audioPlayer = audioPlayer;
  }

  audioButton = (indicator) => {
    return (
      <IndicatorAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
        playingIndicatorId={this.state.playingIndicatorId}
        updateAudioState={this.updateAudioState}
        scorecardUUID={this.props.scorecardUuid}
      />
    );
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