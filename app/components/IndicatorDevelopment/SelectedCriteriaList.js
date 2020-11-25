import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

import { LocalizationContext } from '../Translations';
import { Icon } from 'native-base';

import Color from '../../themes/color';
import customStyle from '../../themes/customStyle';
import uuidv4 from '../../utils/uuidv4';

import { connect } from 'react-redux';
import { removeFromSelected } from '../../actions/selectedCriteriaAction';
import { addToProposed } from '../../actions/proposedCriteriaAction';
import listStyles from '../../themes/listItemStyle';
import CriteriaListItem from './CriteriaListItem';

class SelectedCriteriaList extends Component {
  static contextType = LocalizationContext;

  _handleRemoveAll() {
    this.props._onPressRemoveAll();
  }

  _onPress(criteria) {
    this.props.removeFromSelected(criteria);
    this.props.addToProposed(criteria);
  }

  _renderList() {
    const { translations } = this.context;

    return (
      <View style={[customStyle.card, {flex: 1}]}>
        <View style={styles.header}>
          <Text style={styles.title}>{translations.selectedList} ({this.props.selectedCriterias.length})</Text>

          <TouchableOpacity
            onPress={() => this._handleRemoveAll()}
            style={styles.btnRemoveAll}>

            <Icon name='remove-circle' style={styles.removeIcon} />
            <Text style={styles.textRemove}>{translations.removeAll}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.props.selectedCriterias}
          renderItem={ item => (
            <CriteriaListItem
              criteria={item.item}
              btnText={translations.remove}
              onPress={() => this._onPress(item.item)}
              btnStyle={listStyles.btnRemove}
              showIcon={false}/>
          )}
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
    removeFromSelected: (criteria) => dispatch(removeFromSelected(criteria)),
    addToProposed: (criteria) => dispatch(addToProposed(criteria))
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
