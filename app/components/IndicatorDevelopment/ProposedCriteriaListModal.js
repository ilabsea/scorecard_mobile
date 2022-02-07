import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { Modal, Portal } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { FontFamily } from '../../assets/stylesheets/theme/font';
import ProposedCriteriaItem from './ProposedCriteriaItem';
import SaveButton from '../SaveButton';
import CloseButton from '../CloseButton';

import { addToSelected } from '../../actions/selectedCriteriaAction';
import { removeFromProposed } from '../../actions/proposedCriteriaAction';

import { getDeviceStyle } from '../../utils/responsive_util';
import ProposedCriteriaListModalTabletStyles from '../../styles/tablet/ProposedCriteriaListModalComponentStyle';
import ProposedCriteriaListModalMobileStyles from '../../styles/mobile/ProposedCriteriaListModalComponentStyle';

const responsiveStyles = getDeviceStyle(ProposedCriteriaListModalTabletStyles, ProposedCriteriaListModalMobileStyles);

class ProposedCriteriaModal extends Component {
  static contextType = LocalizationContext;

  maximumCriteriaAmount = 10;

  constructor(props) {
    super(props);

    this.state = {
      criterias: []
    };
  }

  handleAddingCriteria(criteria, action) {
    if (action == 'add') {
      return this.setState({criterias: [...this.state.criterias, criteria]});
    }

    return this.setState({criterias: this.state.criterias.filter(cri => cri.tag != criteria.tag)});
  }

  onSave() {
    for(let i=0; i<this.state.criterias.length; i++) {
      this.props.addToSelected(this.state.criterias[i]);
      this.props.removeFromProposed(this.state.criterias[i]);
    }
    this.onDismiss();
  }

  selectedAmount() {
    return this.props.selectedCriterias.length + this.state.criterias.length;
  }

  _renderList() {
    return (
      <FlatList
        data={this.props.proposedCriterias}
        renderItem={ item =>
          <ProposedCriteriaItem
            selectedAmount={ this.selectedAmount() }
            onPress={(item, action) => this.handleAddingCriteria(item, action)}
            maximumCriteriaAmount={this.maximumCriteriaAmount}
            criteria={item.item}/>
        }
        keyExtractor={(item, index) => index.toString()}
      />
    )
  }

  onDismiss() {
    !!this.props.onDismiss && this.props.onDismiss();
    this.setState({criterias: []});
  }

  _renderSubTitle() {
    if (this.props.proposedCriterias.length === 0)
      return <Text style={responsiveStyles.label}>{ this.context.translations.noIndicator }</Text>

    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={[{marginBottom: 16, flex: 1, fontFamily: FontFamily.title}, responsiveStyles.label]}>{this.context.translations.pleaseSelectIndicator}</Text>
        <Text style={[{fontFamily: FontFamily.title}, responsiveStyles.label]}>{ this.selectedAmount() } / {this.maximumCriteriaAmount}</Text>
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

        { this.props.proposedCriterias.length > 0 &&
          <SaveButton
            disabled={this.state.criterias.length === 0}
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
    proposedCriterias: state.proposedCriterias,
    selectedCriterias: state.selectedCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToSelected: (criteria) => dispatch(addToSelected(criteria)),
    removeFromProposed: (criteria) => dispatch(removeFromProposed(criteria))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposedCriteriaModal);