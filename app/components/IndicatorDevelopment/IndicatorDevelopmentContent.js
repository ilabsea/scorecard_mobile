import React, {Component} from 'react';
import { View, Dimensions } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorDevelopmentContentHeader from './IndicatorDevelopmentContentHeader';
import IndicatorDevelopmentList from './IndicatorDevelopmentList';
import NoDataMessage from '../NoDataMessage';
import { containerPadding } from '../../utils/responsive_util';

class IndicatorDevelopmentContent extends Component {
  static contextType = LocalizationContext;

  _renderNoData() {
    const { translations } = this.context;
    const top = (Dimensions.get('screen').height - 305) / 2;

    return (
      <NoDataMessage
        title={translations.pleaseAddCriteria}
        buttonLabel={translations.criteria}
        onPress={() => this.props.openModal() }
        customContainerStyle={{position: 'absolute', width: '100%', top: top}}
      />
    );
  }

  renderHeader() {
    return (
      <IndicatorDevelopmentContentHeader
        openModal={this.props.openModal}
        hasData={!!this.props.selectedCriterias.length}
      />
    )
  }

  render() {
    const hasData = !!this.props.selectedCriterias.length;

    return (
      <View style={{flex: 1, paddingHorizontal: containerPadding}}>
        <IndicatorDevelopmentList
          scorecardUuid={this.props.scorecardUuid}
          selectedCriterias={this.props.selectedCriterias}
          updateSelectedCriteriasOrder={this.props.updateSelectedCriteriasOrder}
          hasData={hasData}
          openModal={this.props.openModal}
          renderHeader={() => this.renderHeader()}
        />

        { !hasData && this._renderNoData() }
      </View>
    )
  }
}

export default IndicatorDevelopmentContent;