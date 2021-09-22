import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import IndicatorCard from './IndicatorCard';
import CriteriaAudioButton from './CriteriaAudioButton';
import createNewIndicatorHelper from '../../helpers/create_new_indicator_helper';
import { getDeviceStyle } from '../../utils/responsive_util';
import { FontFamily } from '../../assets/stylesheets/theme/font';

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
  }

  updateAudioState = (indicatorId, audioPlayer) => {
    this.setState({playingIndicatorId: indicatorId});
    this.audioPlayer = audioPlayer;
  }

  audioButton(indicator, index, tag) {
    // let isAddNewCriteriaIndex = createNewIndicatorHelper.isAddNewIndicatorSection(index, this.props.indicators);

    return (
      <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
        playingIndicatorId={this.state.playingIndicatorId}
        updateAudioState={this.updateAudioState}
        scorecardUUID={this.props.scorecardUuid}
        // isAddNewCriteria={isAddNewCriteriaIndex}
        isAddNewCriteria={ tag == 'add_new' }
      />
    );
  }

  indicatorCard = (indicator, index, tag) => {
    const itemKey = 'indicator-card-' + index;

    return (
      <IndicatorCard
        // indicators={this.props.indicators}
        indicator={indicator}
        customIndicator={null}
        index={index}
        scorecardUuid={this.props.scorecardUuid}
        selectIndicator={this.props.selectIndicator}
        selectedIndicators={this.props.selectedIndicators}
        isSearching={this.props.isSearching}
        key={itemKey}
        isAddNew={tag == 'add_new'}
      >
        {this.audioButton(indicator, index, tag)}
      </IndicatorCard>
    )
  }

  renderIndicators(indicators, tag) {
    console.log('indicator = ', indicators[0])
    return indicators.map((indicator, index) => {
      return this.indicatorCard(indicator, index, tag);
    });
  }

  renderGroupedIndicators() {
    let doms = [];

    // for (const [tag, indicators] of Object.entries(this.props.indicators)) {
    for (const [tag, indicators] of Object.entries(this.props.groupedIndicators)) {
      doms.push(
        <View>
          <Text style={styles.tagTitle}>{ tag != 'add_new' ? tag : '' }</Text>

          <View style={{flexDirection: 'row'}}>
            { this.renderIndicators(indicators, tag) }
          </View>
        </View>
      );
    }

    return doms;
  }

  render() {
    return (
      <View style={[styles.container, getDeviceStyle({}, { justifyContent: 'center' })]}>
        { this.renderGroupedIndicators() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    marginHorizontal: -10,
    marginTop: 10,
  },
  tagTitle: {
    fontFamily: FontFamily.title,
    fontSize: 18,
    marginLeft: 16,
    marginTop: 15,
    marginBottom: 5
  }
});

export default CriteriaSelectionItems;