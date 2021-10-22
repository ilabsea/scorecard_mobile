import React, { Component } from 'react';
import { View } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorCard from './IndicatorCard';
import CriteriaAudioButton from './CriteriaAudioButton';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';

class CriteriaSelectionItems extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.audioPlayer = null;
    this.state = {
      playingIndicatorId: null,
      isModalVisible: false,
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

  audioButton = (indicator, index) => {
    let isAddNewCriteriaIndex = createNewIndicatorHelper.isAddNewIndicatorSection(index, this.props.indicators);

    return (
      <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
        playingIndicatorId={this.state.playingIndicatorId}
        updateAudioState={this.updateAudioState}
        scorecardUUID={this.props.scorecardUuid}
        isAddNewCriteria={isAddNewCriteriaIndex}
      />
    );
  }

  renderIndicatorCard(indicator, index) {
    const itemKey = 'indicator-card-' + index;

    return (
      <IndicatorCard
        indicators={this.props.indicators}
        indicator={indicator}
        index={index}
        scorecardUuid={this.props.scorecardUuid}
        selectIndicator={this.props.selectIndicator}
        selectedIndicators={this.props.selectedIndicators}
        isSearching={this.props.isSearching}
        key={itemKey}
      >
        {this.audioButton(indicator, index)}
      </IndicatorCard>
    )
  }

  render() {
    return (
      <View style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 2, marginTop: (this.props.isSearching || this.props.isEdit) ? 5 : 15}}>
        { 
          this.props.indicators.map((indicator, index) => {
            return this.renderIndicatorCard(indicator, index)
          })
        }
      </View>
    )
  }
}

export default CriteriaSelectionItems;