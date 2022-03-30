import React, {Component} from 'react';
import { View, Dimensions } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorDevelopmentContentHeader from './IndicatorDevelopmentContentHeader';
import IndicatorDevelopmentList from './IndicatorDevelopmentList';
import NoDataMessage from '../NoDataMessage';
import { containerPadding } from '../../utils/responsive_util';
import Rating from '../../models/Rating';

class IndicatorDevelopmentContent extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);

    this.state = {
      headerHeight: 0,
      hasRating: Rating.has(props.scorecardUuid)
    }
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", async () => {
      this.setState({ hasRating: Rating.has(this.props.scorecardUuid) });
    });
  }
  
  componentWillUnmount() {
    this.focusListener && this.focusListener();
  }

  _renderNoData() {
    const { translations } = this.context;
    const top = (Dimensions.get('screen').height - 305) / 2;

    return (
      <NoDataMessage
        title={translations.pleaseAddIndicators}
        buttonLabel={translations.indicator}
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
        hasRating={this.state.hasRating}
        tipModalRef={this.props.tipModalRef}
      />
    )
  }

  render() {
    const hasData = !!this.props.selectedCriterias.length;

    return (
      <View style={{flex: 1}}
        onLayout={(event) => this.setState({ headerHeight: event.nativeEvent.layout.y - 22 })}
      >
        <View style={{flex: 1, paddingHorizontal: containerPadding}}>
          <IndicatorDevelopmentList
            scorecardUuid={this.props.scorecardUuid}
            selectedCriterias={this.props.selectedCriterias}
            updateSelectedIndicatorsOrder={this.props.updateSelectedIndicatorsOrder}
            hasData={hasData}
            openModal={this.props.openModal}
            renderHeader={() => this.renderHeader()}
            headerHeight={this.state.headerHeight}
            hasRating={this.state.hasRating}
          />
        </View>

        { !hasData && this._renderNoData() }
      </View>
    )
  }
}

export default IndicatorDevelopmentContent;