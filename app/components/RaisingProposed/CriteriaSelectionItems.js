import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper'

import { LocalizationContext } from '../Translations';
import IndicatorCard from './IndicatorCard';
import CriteriaAudioButton from './CriteriaAudioButton';
import indicatorHelper from '../../helpers/indicator_helper';
import { NO_TAG } from '../../constants/main_constant';

import CriteriaSelectionItemsTabletStyle from '../../styles/tablet/CriteriaSelectionItemsComponentStyle';
import CriteriaSelectionItemsMobileStyle from '../../styles/mobile/CriteriaSelectionItemsComponentStyle';
import { getDeviceStyle } from '../../utils/responsive_util';

const styles = getDeviceStyle(CriteriaSelectionItemsTabletStyle, CriteriaSelectionItemsMobileStyle);

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

  audioButton = (indicator) => {
    return (
      <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
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
        indicators={this.props.indicators}
        indicator={indicator}
        index={index}
        scorecardUuid={this.props.scorecardUuid}
        selectIndicator={this.props.selectIndicator}
        selectedIndicators={this.props.selectedIndicators}
        isSearching={this.props.isSearching}
        key={itemKey}
        isEdit={this.props.isEdit}
      >
        {this.audioButton(indicator)}
      </IndicatorCard>
    )
  }

  renderIndicators(indicators, tag) {
    return indicators.map((indicator, index) => {
      return this.renderIndicatorCard(indicator, index, tag);
    });
  }

  renderGroupedIndicators() {
    let doms = [];
    let indicatorTags = indicatorHelper.getSortedIndicatorTag(this.props.groupedIndicators);

    indicatorTags.map((tag, index) => {
      const indicators = this.props.groupedIndicators[tag];
      const tagLabel = tag === NO_TAG ? this.context.translations.noTag : tag;

      doms.push(
        <View key={`${tag}-${index}`} style={[styles.indicatorContainer]}>
          <Text style={styles.tagTitle}>{ tagLabel }</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            { !!indicators && this.renderIndicators(indicators, tag) }
          </View>
          { index < indicatorTags.length - 1 && <Divider style={{marginTop: 12, backgroundColor: '#b5b5b5'}} /> }
        </View>
      );
    });

    return doms;
  }

  render() {
    return (
      <View style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: 2, marginTop: (this.props.isSearching || this.props.isEdit) ? -10 : 15}}>
        { this.renderGroupedIndicators() }
      </View>
    )
  }
}

export default CriteriaSelectionItems;