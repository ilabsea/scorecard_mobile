import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { Modal, Portal } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import ProposedIndicatorItem from './ProposedIndicatorItem';
import SaveButton from '../SaveButton';
import CloseButton from '../CloseButton';

import { addToSelected } from '../../actions/selectedIndicatorAction';
import { removeFromProposed } from '../../actions/proposedIndicatorAction';

import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedIndicatorListModalTabletStyles from '../../styles/tablet/ProposedIndicatorListModalComponentStyle';
import ProposedIndicatorListModalMobileStyles from '../../styles/mobile/ProposedIndicatorListModalComponentStyle';

const responsiveStyles = getDeviceStyle(ProposedIndicatorListModalTabletStyles, ProposedIndicatorListModalMobileStyles);

class ProposedIndicatorListModal extends Component {
  static contextType = LocalizationContext;

  maximumIndicatorAmount = 10;

  constructor(props) {
    super(props);

    this.state = {
      indicators: []
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
    this.onDismiss();
  }

  selectedAmount() {
    return this.props.selectedIndicators.length + this.state.indicators.length;
  }

  _renderList() {
    if (this.props.proposedIndicators.length > 0) {
      return (
        <FlatList
          data={this.props.proposedIndicators}
          renderItem={ item =>
            <ProposedIndicatorItem
              selectedAmount={ this.selectedAmount() }
              onPress={(item, action) => this.handleAddingIndicator(item, action)}
              maximumIndicatorAmount={this.maximumIndicatorAmount}
              indicator={item.item}/>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      )
    }
  }

  onDismiss() {
    !!this.props.onDismiss && this.props.onDismiss();
    this.setState({indicators: []});
  }

  _renderSubTitle() {
    if (this.props.proposedIndicators.length === 0)
      return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={responsiveStyles.label}>{ this.context.translations.noIndicator }</Text>
            </View>

    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[{marginBottom: 16, flex: 1, fontFamily: FontFamily.title}, responsiveStyles.label]}>{this.context.translations.pleaseSelectIndicator}</Text>
        <Text style={[{fontFamily: FontFamily.title}, responsiveStyles.label]}>{ this.selectedAmount() } / {this.maximumIndicatorAmount}</Text>
      </View>
    )
  }

  _renderBottomButtons() {
    return (
      <View style={responsiveStyles.btnWrapper}>
        <CloseButton
          onPress={() => this.onDismiss()}
          label={this.context.translations.close}
        />

        { this.props.proposedIndicators.length > 0 &&
          <SaveButton
            disabled={this.state.indicators.length === 0}
            onPress={() => this.onSave()}
            label={this.context.translations.save}
          />
        }
      </View>
    )
  }

  render() {
    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => this.onDismiss()} contentContainerStyle={responsiveStyles.container}>
          <Text style={responsiveStyles.header}>{this.context.translations.indicatorList}</Text>
          { this._renderSubTitle() }

          { this._renderList() }

          { this._renderBottomButtons() }
        </Modal>
      </Portal>
    )
  }
}

function mapStateToProps(state) {
  return {
    proposedIndicators: state.proposedIndicators,
    selectedIndicators: state.selectedIndicators,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToSelected: (indicator) => dispatch(addToSelected(indicator)),
    removeFromProposed: (indicator) => dispatch(removeFromProposed(indicator))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposedIndicatorListModal);