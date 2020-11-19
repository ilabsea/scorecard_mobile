import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import { Icon, Text } from 'native-base';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';

import { LocalizationContext } from '../../components/Translations';
import ProgressHeader from '../../components/ProgressHeader';
import ActionButton from '../../components/ActionButton';
import Color from '../../themes/color';
import Tip from '../../components/Tip';

import { Table, TableWrapper, Row} from 'react-native-table-component';
import ScorecardResultListItem from '../../components/ScorecardResult/ScorecardResultListItem';

import { Provider} from 'react-native-paper';
import FormModal from '../../components/ScorecardResult/FormModal';

class ScorecardResult extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      scorecard: { uuid: '931107' },
      currentCriteria: {},
    };
  }

  componentDidMount() {
    this.props.getAll(this.state.scorecard.uuid);
  }

  _renderHeader() {
    const steps = [
      "Indicator Development Sections",
      "Scorecard Voting",
      "Scorecard Result"
    ];

    return (
      <ProgressHeader
        title={"this.state.scorecard.name"}
        onBackPress={() => this.props.navigation.goBack()}
        steps={steps}
        progressIndex={2}/>
    )
  }

  _renderTable() {
    const tableHead = ['Criteria', 'Score', 'Strength', 'Weakness', 'Improvement', 'Next Step'];
    const tableRows = this.props.criterias;

    return (
      <Table borderStyle={{borderColor: '#c1c1c1', borderWidth: 1}}>
        <Row data={tableHead} style={styles.head} textStyle={[styles.text]} flexArr={[4, 2, 3, 3, 3, 3]}/>
        {
          tableRows.map((criteria, index) => (
            <ScorecardResultListItem key={index} criteria={criteria} onPress={(fieldName) => this._handleShowModal(criteria, fieldName)}/>
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

  render() {
    return (
      <Provider style={{height: '100%'}}>
        { this._renderHeader() }

        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <Tip />

            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <Text style={styles.h1}>Scorecard Result</Text>
            </View>

            { this._renderTable() }
          </View>
        </ScrollView>

        <View style={{margin: 20}}>
          <ActionButton
            onPress={() => console.log('hello')}
            customBackgroundColor={Color.headerColor}
            label={'FINISH'}/>

          <FormModal
            visible={this.state.visible}
            criteria={this.state.currentCriteria}
            onDimiss={() => this.setState({visible: false})}
          />
        </View>
      </Provider>
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
    fontWeight: 'bold',
    marginBottom: 20
  },
  head: {
    height: 64,
    backgroundColor: '#eee',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },
})
