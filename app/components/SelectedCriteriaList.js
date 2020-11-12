import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

import { LocalizationContext } from './Translations';
import { Icon } from 'native-base';

import realm from '../db/schema';
import Color from '../themes/color';
import customStyle from '../themes/customStyle';
import uuidv4 from '../utils/uuidv4';

import { connect } from 'react-redux';
import { removeAll } from '../actions/selectedCriteriaAction';
import { resetProposed } from '../actions/proposedCriteriaAction';

import SelectedCriteriaListItem from './SelectedCriteriaListItem';

class SelectedCriteriaList extends Component {
  static contextType = LocalizationContext;

  _handleRemoveAll() {
    this.props.resetProposed();
    this.props.removeAll();
  }

  _renderList() {
    return (
      <View style={[customStyle.card, {flex: 1}]}>
        <View style={styles.header}>
          <Text style={styles.title}>Selected ({this.props.selectedCriterias.length})</Text>

          <TouchableOpacity
            onPress={() => this._handleRemoveAll()}
            style={styles.btnRemoveAll}>

            <Icon name='remove-circle' style={styles.removeIcon} />
            <Text style={styles.textRemove}>Remove All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.props.selectedCriterias}
          renderItem={item => <SelectedCriteriaListItem criteria={item.item}/>}
          keyExtractor={item => uuidv4()}
        />
      </View>
    )
  }

  render() {
    return (this._renderList());
  }
}

function mapStateToProps(state) {
  return {
    selectedCriterias: state.selectedCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeAll: () => dispatch(removeAll()),
    resetProposed: () => dispatch(resetProposed())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectedCriteriaList);

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.headerColor,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    padding: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1
  },
  textRemove: {
    color: '#fff',
    fontWeight: 'bold'
  },
  btnRemoveAll: {
    marginRight: 16,
    flexDirection: 'row'
  },
  removeIcon: {
    fontSize: 20,
    color: '#fff',
    marginRight: 4
  }
})
