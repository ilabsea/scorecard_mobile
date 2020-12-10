import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';
import realm from '../../db/schema';

import { LocalizationContext } from '../../components/Translations';
import HorizontalProgressHeader from '../../components/HorizontalProgressHeader';
import ActionButton from '../../components/ActionButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';

import { Table, TableWrapper, Row} from 'react-native-table-component';
import ScorecardResultTableRow from '../../components/ScorecardResult/ScorecardResultTableRow';

import FormModal from '../../components/ScorecardResult/FormModal';
import { FontSize, FontFamily } from '../../assets/stylesheets/theme/font';

class ScorecardResult extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: realm.objects('Scorecard').filtered(`uuid == '${props.route.params.scorecard_uuid}'`)[0],
      currentCriteria: {},
      visible: false
    };
  }

  componentDidMount() {
    this.props.getAll(this.state.scorecard.uuid);
  }

  _renderHeader() {
    return (
      <HorizontalProgressHeader
        title={this.state.scorecard.name}
        navigation={this.props.navigation}
        progressIndex={4}/>
    )
  }

  _renderTable() {
    const { translations } = this.context;
    let tableHead = ['criteria', 'score', 'strength', 'weakness', 'desired_change', 'suggested_action'];
    tableHead = tableHead.map(x => translations[x]);
    const tableRows = this.props.criterias;

    return (
      <Table borderStyle={{borderColor: '#c1c1c1', borderWidth: 1}}>
        <Row data={tableHead} style={styles.head} textStyle={[styles.text]} flexArr={[4, 2, 3, 3, 3, 3]}/>
        {
          tableRows.map((criteria, index) => (
            <ScorecardResultTableRow key={index} criteria={criteria} onPress={(fieldName) => this._handleShowModal(criteria, fieldName)}/>
          ))
        }
      </Table>
    )
  }

  _handleShowModal(criteria, fieldName) {
    this.setState({
      currentCriteria: Object.assign({currentFieldName: fieldName}, criteria),
      visible: true
    });
  }

  _finish() {
    this.props.navigation.reset({ index: 1, routes: [{ name: 'Home' }, {name: 'ScorecardList'}] });
  }

  render() {
    const { translations } = this.context;

    return (
      <View style={{height: '100%'}}>
        { this._renderHeader() }

        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Tip />

            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <Text style={styles.h1}>{ translations.scorecardResult }</Text>
            </View>

            { this._renderTable() }
          </View>
        </ScrollView>

        <View style={{margin: 20}}>
          <ActionButton
            onPress={() => this._finish()}
            customBackgroundColor={Color.headerColor}
            label={translations.finish}/>

          <FormModal
            visible={this.state.visible}
            criteria={this.state.currentCriteria}
            onDimiss={() => this.setState({visible: false})}
          />
        </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    criterias: state.votingCriterias.sort((a, b) => (a.median > b.median) ? 1 : -1),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAll: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScorecardResult);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  },
  h1: {
    fontSize: 24,
    fontFamily: FontFamily.title,
  },
  head: {
    minHeight: 64,
    backgroundColor: '#eee',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontFamily: FontFamily.title,
    fontSize: 18
  },
})
