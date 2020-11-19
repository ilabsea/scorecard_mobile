import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

import realm from '../db/schema';
import { LocalizationContext } from './Translations';
import Color from '../themes/color';
import customStyle from '../themes/customStyle';
import uuidv4 from '../utils/uuidv4';

import { connect } from 'react-redux';

import ProposedCriteriaListItem from './ProposedCriteriaListItem';

class ProposedCriteriaList extends Component {
  static contextType = LocalizationContext;

  _renderList() {
    let data= this.props.proposedCriterias;

    return (
      <View style={[customStyle.card, { flex: 1 }]}>
        <Text style={styles.header}>Listed ({data.length})</Text>

        <FlatList
          data={data}
          renderItem={item => <ProposedCriteriaListItem criteria={item.item}/>}
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
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProposedCriteriaList);

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    padding: 20,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: Color.listItemBorderColor
  }
})
