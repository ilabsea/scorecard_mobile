import React from 'react';
import { ScrollView, View } from 'react-native';

import {LocalizationContext} from '../Translations';
import ProposeNewIndicatorCardItem from './ProposeNewIndicatorCardItem';
import EmptyListAction from '../Share/EmptyListAction';
import Indicator from '../../models/Indicator';
import proposedIndicatorHelper from '../../helpers/proposed_indicator_helper';

class ProposeNewIndicatorProposedList extends React.Component {
  static contextType = LocalizationContext;

  onPressItem = (indicator, indicatorableId) => {
    let indicatorParams = indicator
    indicatorParams['indicatorable_id'] = indicatorableId
    const proposedIndicatorParams = { scorecardUuid: this.props.scorecardUuid, indicator: indicatorParams };
    proposedIndicatorHelper.showFormModal(this.props.bottomSheetRef, this.props.formModalRef, proposedIndicatorParams);
  }

  renderList = () => {
    return this.props.proposedIndicators.map(proposedIndicator => {
      const indicator = Indicator.findByIndicatorableId(proposedIndicator.indicatorable_id, this.props.endpointId)
      return <ProposeNewIndicatorCardItem key={proposedIndicator.uuid} scorecardUuid={this.props.scorecardUuid} audio={null} searchedText=''
                indicatorName={indicator.name} indicatorableId={proposedIndicator.indicatorable_id} indicatorType={indicator.type}
                onPressItem={() => this.onPressItem(indicator, proposedIndicator.indicatorable_id)}
             />
    })
  }

  render() {
    if (this.props.proposedIndicators.length == 0)
      return <EmptyListAction title={this.context.translations.noIndicatorProposed} hideButton={true} contentContainerStyle={{zIndex: -2, flexGrow: 1, justifyContent: 'center', paddingTop: 26}} />

    return (
      <View style={{flexGrow: 1, zIndex: -2}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {this.renderList()}
        </ScrollView>
      </View>
    )
  }
}

export default ProposeNewIndicatorProposedList