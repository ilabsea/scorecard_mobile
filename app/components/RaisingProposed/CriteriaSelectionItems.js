import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import IndicatorCard from './IndicatorCard';
import CriteriaAudioButton from './CriteriaAudioButton';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';
import { getDeviceStyle } from '../../utils/responsive_util';

class CriteriaSelectionItems extends Component {
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

    this.setState = (state, callback) => { return; };
  }

  updateAudioState = (indicatorId, audioPlayer) => {
    this.setState({playingIndicatorId: indicatorId});
    this.audioPlayer = audioPlayer;
  }

  audioButton(indicator, index) {
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

  indicatorCard = (indicator, index) => {
    const itemKey = 'indicator-card-' + index;

    return (
      <IndicatorCard
        indicators={this.props.indicators}
        indicator={indicator}
        customIndicator={null}
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

  renderIndicatorItem(indicator, index) {
    if (index === this.props.indicators.length - 1 && this.props.indicators.length%2 != 0) {
      return (
        <View key={index} style={{flexDirection: 'row', width: '100%'}}>
          { this.indicatorCard(indicator, index) }
          { DeviceInfo.isTablet() &&
            <View style={{flex: 1, marginHorizontal: 10}} />
          }
        </View>
      )
    }

    return this.indicatorCard(indicator, index)
  }

  renderIndicators() {
    return this.props.indicators.map((item, index) => {
      return this.renderIndicatorItem(item, index)
    });
  }

  render() {
    return (
      <View style={[styles.container, getDeviceStyle({}, { justifyContent: 'center' })]}>
        { this.renderIndicators() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
    marginTop: 10
  }
});

export default CriteriaSelectionItems;