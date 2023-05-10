import React, {Component} from 'react';
import { View, Dimensions } from 'react-native';

import { LocalizationContext } from '../Translations';
import IndicatorDevelopmentAddNewHeader from './IndicatorDevelopmentAddNewHeader';
import IndicatorDevelopmentList from './IndicatorDevelopmentList';
import EmptyListAction from '../Share/EmptyListAction';
import Rating from '../../models/Rating';
import Color from '../../themes/color';

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
    const top = (Dimensions.get('screen').height - 305) / 1.2;

    return (
      <EmptyListAction
        title={translations.pleaseAddIndicators}
        buttonLabel={translations.indicatorDevelopmentEmptyButtonLabel}
        onPress={() => this.props.openModal() }
        customContainerStyle={{position: 'absolute', width: '100%', top: top}}
      />
    );
  }

  renderAddNewHeader() {
    return (
      <IndicatorDevelopmentAddNewHeader
        openModal={this.props.openModal}
        hasData={!!this.props.selectedIndicators.length}
        hasRating={this.state.hasRating}
        tipModalRef={this.props.tipModalRef}
      />
    )
  }

  render() {
    const hasData = !!this.props.selectedIndicators.length;

    return (
      <View style={{flex: 1}}
        onLayout={(event) => this.setState({ headerHeight: event.nativeEvent.layout.y - 22 })}
      >
        <View style={{flex: 1, backgroundColor: Color.defaultBgColor}}>
          <IndicatorDevelopmentList
            scorecardUuid={this.props.scorecardUuid}
            selectedIndicators={this.props.selectedIndicators}
            updateSelectedIndicatorsOrder={this.props.updateSelectedIndicatorsOrder}
            hasData={hasData}
            openModal={this.props.openModal}
            renderAddNewHeader={() => this.renderAddNewHeader()}
            headerHeight={this.state.headerHeight}
            hasRating={this.state.hasRating}
            playingUuid={this.props.playingUuid}
            updatePlayingUuid={this.props.updatePlayingUuid}
            tipModalRef={this.props.tipModalRef}
          />
        </View>

        { !hasData && this._renderNoData() }
      </View>
    )
  }
}

export default IndicatorDevelopmentContent;