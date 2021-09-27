import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper';

import { LocalizationContext } from '../Translations';
import IndicatorCard from './IndicatorCard';
import CriteriaAudioButton from './CriteriaAudioButton';
import { getDeviceStyle } from '../../utils/responsive_util';
import { ADD_NEW, NO_TAG } from '../../constants/main_constant';
import indicatorHelper from '../../helpers/indicator_helper';
import CriteriaSelectionItemsTabletStyle from '../../styles/tablet/CriteriaSelectionItemsComponentStyle';
import CriteriaSelectionItemsMobileStyle from '../../styles/mobile/CriteriaSelectionItemsComponentStyle';

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

  audioButton(indicator, index, tag) {
    return (
      <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
        playingIndicatorId={this.state.playingIndicatorId}
        updateAudioState={this.updateAudioState}
        scorecardUUID={this.props.scorecardUuid}
        isAddNewCriteria={ tag == ADD_NEW }
      />
    );
  }

  indicatorCard = (indicator, index, tag) => {
    const itemKey = 'indicator-card-' + index;

    return (
      <IndicatorCard
        indicator={indicator}
        customIndicator={null}
        scorecardUuid={this.props.scorecardUuid}
        selectIndicator={this.props.selectIndicator}
        selectedIndicators={this.props.selectedIndicators}
        isSearching={this.props.isSearching}
        key={itemKey}
        isAddNew={tag == ADD_NEW}
      >
        {this.audioButton(indicator, index, tag)}
      </IndicatorCard>
    )
  }

  renderIndicators(indicators, tag) {
    return indicators.map((indicator, index) => {
      return this.indicatorCard(indicator, index, tag);
    });
  }

  renderGroupedIndicators() {
    let doms = [];
    let indicatorTags = indicatorHelper.getSortedIndicatorTag(this.props.groupedIndicators);

    indicatorTags.map((tag, index) => {
      const isAddNew = tag == ADD_NEW;
      const indicators = this.props.groupedIndicators[tag];
      const tagLabel = isAddNew ? '' : tag == NO_TAG ? this.context.translations.noTag : tag;

      doms.push(
        <View key={`${tag}-${index}`} style={[styles.indicatorContainer]}>
          { !isAddNew && <Text style={styles.tagTitle}>{ tagLabel }</Text> }
          <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 3, marginTop: isAddNew ? 20 : 0}}>
            { !!indicators && this.renderIndicators(indicators, tag) }
          </View>
          { !isAddNew && <Divider style={{marginTop: 12}} /> }
        </View>
      );
    });

    return doms;
  }

  render() {
    return (
      <View style={[styles.container, {marginTop: this.props.isSearching ? -10 : 0}]}>
        { this.renderGroupedIndicators() }
      </View>
    )
  }
}

export default CriteriaSelectionItems;