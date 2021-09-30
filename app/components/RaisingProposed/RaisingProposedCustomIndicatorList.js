import React, {Component} from 'react';
import { Text, View } from 'react-native';

import {LocalizationContext} from '../Translations';
import CriteriaAudioButton from './CriteriaAudioButton';
import IndicatorCard from './IndicatorCard';
import RaisingProposedScrollView from './RaisingProposedScrollView';
import { getDeviceStyle } from '../../utils/responsive_util';
import NoDataMessageTabletStyles from '../../styles/tablet/NoDataMessageComponentStyle';
import NoDataMessageMobileStyles from '../../styles/mobile/NoDataMessageComponentStyle';

const responsiveStyles = getDeviceStyle(NoDataMessageTabletStyles, NoDataMessageMobileStyles);

class RaisingProposedCustomIndicatorList extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.audioPlayer = null;
    this.state = {
      playingIndicatorId: null,
    };
  }

  updateAudioState = (indicatorId, audioPlayer) => {
    this.setState({playingIndicatorId: indicatorId});
    this.audioPlayer = audioPlayer;
  }

  audioButton = (indicator, index) => {
    return (
      <CriteriaAudioButton indicator={indicator} audioPlayer={this.audioPlayer}
        playingIndicatorId={this.state.playingIndicatorId}
        updateAudioState={this.updateAudioState}
        scorecardUUID={this.props.scorecardUuid}
        isAddNewCriteria={false}
      />
    );
  }

  selectIndicator(indicator) {
    this.state.audioPlayer = null;
    this.props.editCustomIndicator(indicator)
  }

  renderIndicatorItems = () => {
    return this.props.indicators.map((indicator, index) => {
      const itemKey = 'indicator-card-' + index;

      return (
        <IndicatorCard
          indicators={this.props.indicators}
          indicator={indicator}
          customIndicator={null}
          index={index}
          scorecardUuid={this.props.scorecardUuid}
          selectIndicator={() => this.selectIndicator(indicator)}
          selectedIndicators={this.props.selectedCustomIndicator ? [this.props.selectedCustomIndicator] : []}
          isSearching={this.props.isSearching}
          key={itemKey}
        >
          {this.audioButton(indicator, index)}
        </IndicatorCard>
      )
    });
  }


  renderInidcatorList() {
    return (
      <RaisingProposedScrollView>
        <View style={{flexWrap: 'wrap', flexDirection: 'row', marginHorizontal: -7}}>
          { this.renderIndicatorItems() }
        </View>
      </RaisingProposedScrollView>
    )
  }

  renderEmptyMessage() {
    return (
      <Text style={[responsiveStyles.label, {textAlign: 'center', marginTop: 0}]}>
        { this.context.translations.noCustomCriteria }
      </Text>
    )
  }

  render() {
    return (
      this.props.indicators.length > 0
        ? this.renderInidcatorList()
        : this.renderEmptyMessage()
    )
  }
}

export default RaisingProposedCustomIndicatorList;