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

class ProposedCriteriaModal extends Component {
  static contextType = LocalizationContext;

  criterias = [];

  constructor(props) {
    super(props);

    this.state = {
      availableAmount: 5 - this.props.selectedCriterias.length
    };
  }

  handleAddingCriteria(criteria, action) {
    if (action == 'add') {
      this.setState({availableAmount: this.state.availableAmount - 1});
      this.criterias.push(criteria);
      return
    }

    this.setState({availableAmount: this.state.availableAmount + 1});
    this.criterias = this.criterias.filter(cri => cri.tag != criteria.tag);
  }

  onSave() {
    !!this.props.onDismiss && this.props.onDismiss();

    for(let i=0; i<this.criterias.length; i++) {
      this.props.addToSelected(this.criterias[i]);
      this.props.removeFromProposed(this.criterias[i]);
    }

    this.criterias = [];
  }

  _renderList() {
    return (
      <FlatList
        data={this.props.proposedCriterias}
        renderItem={ item =>
          <ProposedCriteriaItem
            availableAmount={this.state.availableAmount}
            onPress={(item, action) => this.handleAddingCriteria(item, action)}
            criteria={item.item} />
        }
      />
    )
  }

  onDismiss() {
    !!this.props.onDismiss && this.props.onDismiss();
    this.criterias = [];
  }

  render() {
    const { translations } = this.context;

    return (
      <Portal>
        <Modal visible={this.props.visible} onDismiss={() => this.onDismiss()} contentContainerStyle={ styles.container }>
          <Text style={styles.header}>{translations.criteriaList}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginBottom: 16, flex: 1}}>{translations.pleaseSelectCriteria}</Text>
            <Text>{translations.availableAmount}: {this.state.availableAmount}</Text>
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
    backgroundColor: 'white',
    padding: 20,
    maxHeight: 650,
    marginHorizontal: 30,
    justifyContent: 'flex-start'
  },
  btnWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  header: {
    fontSize: 24,
    fontFamily: FontFamily.title,
    textTransform: 'capitalize'
  },
});
