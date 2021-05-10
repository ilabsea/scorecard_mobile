import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

import { connect } from 'react-redux';
import { Modal, Portal, ProgressBar } from 'react-native-paper';
import { LocalizationContext } from '../Translations';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';
import ProposedCriteriaItem from './ProposedCriteriaItem';
import SaveButton from '../SaveButton';

import { addToSelected } from '../../actions/selectedCriteriaAction';
import { removeFromProposed } from '../../actions/proposedCriteriaAction';

import Color from '../../themes/color';
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
    !!this.props.onDismiss && this.props.onDismiss();

    for(let i=0; i<this.state.criterias.length; i++) {
      this.props.addToSelected(this.state.criterias[i]);
      this.props.removeFromProposed(this.state.criterias[i]);
    }

    this.setState({criterias: []});
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

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => this.onDismiss()} contentContainerStyle={[styles.container, responsiveStyles.container]}>
          <Text style={[styles.header, responsiveStyles.header]}>{translations.criteriaList}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={[{marginBottom: 16, flex: 1}, responsiveStyles.label]}>{translations.pleaseSelectCriteria}</Text>
            <Text style={[{fontFamily: FontFamily.title}, responsiveStyles.label]}>{ this.selectedAmount() } / {this.maximumCriteriaAmount}</Text>
          </View>

          { this._renderList() }

          <View style={{flex: 1}}></View>

          <View style={styles.btnWrapper}>
            <SaveButton onPress={() => this.onSave()} label={translations.save} />
          </View>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    marginHorizontal: 30,
    justifyContent: 'flex-start',
  },
  btnWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  header: {
    fontFamily: FontFamily.title,
    textTransform: 'capitalize'
  },
});
