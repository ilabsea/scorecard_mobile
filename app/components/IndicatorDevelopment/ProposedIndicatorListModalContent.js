import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { LocalizationContext } from '../Translations';
import ProposedIndicatorItem from './ProposedIndicatorItem';
import ProposedIndicatorModalSubTitle from './ProposedIndicatorModalSubTitle';
import FormBottomSheetButton from '../FormBottomSheetModal/FormBottomSheetButton';
import BottomSheetModalTitle from '../BottomSheetModalTitle';

import { addToSelected } from '../../actions/selectedIndicatorAction';
import { removeFromProposed } from '../../actions/proposedIndicatorAction';
import { indicatorDevelopmentContentHeight } from '../../constants/modal_constant';

import { getDeviceStyle, containerPadding } from '../../utils/responsive_util';
import { modalContentPaddingBottom } from '../../utils/component_util';
import ProposedIndicatorListModalTabletStyles from '../../styles/tablet/ProposedIndicatorListModalComponentStyle';
import ProposedIndicatorListModalMobileStyles from '../../styles/mobile/ProposedIndicatorListModalComponentStyle';

const responsiveStyles = getDeviceStyle(ProposedIndicatorListModalTabletStyles, ProposedIndicatorListModalMobileStyles);

class ProposedIndicatorListModalContent extends Component {
  static contextType = LocalizationContext;

  maximumIndicatorAmount = 10;

  constructor(props) {
    super(props);

    this.state = {
      indicators: [],
      playingUuid: null,
    };
  }

  handleAddingIndicator(indicator, action) {
    if (action == 'add') {
      return this.setState({indicators: [...this.state.indicators, indicator]});
    }

    return this.setState({indicators: this.state.indicators.filter(indi => indi.tag != indicator.tag)});
  }

  onSave() {
    for(let i=0; i<this.state.indicators.length; i++) {
      this.props.addToSelected(this.state.indicators[i]);
      this.props.removeFromProposed(this.state.indicators[i]);
    }
    this.setState({indicators: []}); 
    this.props.onDismiss();
  }

  selectedAmount() {
    return this.props.selectedIndicators.length + this.state.indicators.length;
  }

  _renderList() {
    if (this.props.proposedIndicators.length > 0) {
      return this.props.proposedIndicators.map((proposedIndicator, index) => {
        return <ProposedIndicatorItem
                key={`prop-${index}`}
                selectedAmount={ this.selectedAmount() }
                onPress={(proposedIndicator, action) => this.handleAddingIndicator(proposedIndicator, action)}
                maximumIndicatorAmount={this.maximumIndicatorAmount}
                indicator={proposedIndicator}
                playingUuid={this.state.playingUuid}
                updatePlayingUuid={(uuid) => this.setState({playingUuid: uuid})}
              />
      });
    }
  }

  _renderSubTitle() {
    return <ProposedIndicatorModalSubTitle
            scorecardUuid={this.props.scorecardUuid}
            proposedIndicators={this.props.proposedIndicators}
            selectedAmount={this.selectedAmount()}
          />
  }

  render() {
    return (
      <View style={{ height: hp(indicatorDevelopmentContentHeight), paddingBottom: modalContentPaddingBottom(this.state.sdkVersion) }}>
        <BottomSheetModalTitle title={ this.context.translations.proposedIndicatorList } />

        <View style={{flex: 1, padding: containerPadding, paddingBottom: 0}}>
          { this._renderSubTitle() }

          <ScrollView contentContainerStyle={{flexGrow: 1, paddingTop: 5}}>
            { this._renderList() }
          </ScrollView>
        </View>

        { this.props.proposedIndicators.length > 0 &&
          <FormBottomSheetButton isValid={this.state.indicators.length != 0} save={() => this.onSave()} />
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    proposedIndicators: state.proposedIndicators,
    selectedIndicators: state.selectedIndicators,
    sdkVersion: state.sdkVersion
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToSelected: (indicator) => dispatch(addToSelected(indicator)),
    removeFromProposed: (indicator) => dispatch(removeFromProposed(indicator))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposedIndicatorListModalContent);