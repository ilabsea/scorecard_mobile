import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

import { LocalizationContext } from '../Translations';
import Color from '../../themes/color';
import customStyle from '../../themes/customStyle';
import uuidv4 from '../../utils/uuidv4';

import { connect } from 'react-redux';
import CriteriaListItem from './CriteriaListItem';
import { addToSelected } from '../../actions/selectedCriteriaAction';
import { removeFromProposed } from '../../actions/proposedCriteriaAction';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

class ProposedCriteriaList extends Component {
  static contextType = LocalizationContext;

  _onPress(criteria) {
    this.props.addToSelected(criteria);
    this.props.removeFromProposed(criteria);
  }

  _renderList() {
    const { translations } = this.context;
    let data= this.props.proposedCriterias;

    return (
      <View style={[customStyle.card, { flex: 1 }]}>
        <Text style={styles.title}>{translations.proposedList} ({data.length})</Text>

        <FlatList
          data={data}
          renderItem={item => <CriteriaListItem criteria={item.item} btnText={translations.add} onPress={() => this._onPress(item.item)}/>}
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
    proposedCriterias: state.proposedCriterias,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addToSelected: (criteria) => dispatch(addToSelected(criteria)),
    removeFromProposed: (criteria) => dispatch(removeFromProposed(criteria))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProposedCriteriaList);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    padding: 20,
    fontFamily: FontFamily.title,
    borderBottomWidth: 1,
    borderColor: Color.listItemBorderColor
  }
})
