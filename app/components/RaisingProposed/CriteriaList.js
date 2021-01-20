import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CriteriaCard from './CriteriaCard';
import {LocalizationContext} from '../Translations';
import {Criteria} from '../../services/criteria_service';
import { connect } from 'react-redux';

class CriteriaList extends Component {
  static contextType = LocalizationContext;
  constructor(props) {
    super(props);
    this.criteria = new Criteria(this.props.scorecardUUID);
  }

  renderCriteriaList = () => {
    const {translations} = this.context;

    const criterias = this.criteria.getCriterias();
    return criterias.map((criteria, index) => {
      const criteriaName = index === 0 ? translations['allCriteria'] : criteria.name;
      return (<CriteriaCard criteria={criteria} criteriaName={criteriaName} index={index} key={index} />);
    });
  }

  render() {
    const {translations} = this.context;
    return (
      <View style={{marginTop: 15}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingTitle}>{translations['listCriteria']}</Text>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row', paddingBottom: 6, marginTop: 20}}
        >
          {this.renderCriteriaList()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: '#22354c',
  },
  viewAllLabel: {
    textTransform: 'uppercase',
    color: '#e4761e',
    fontWeight: 'bold',
  },
  criteriaCardContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    flexDirection: 'row',
    marginRight: 15,
    elevation: 3,
  },
});

function mapStateToProps(state) {
  return {
    criterias: state.criteriaListReducer.criterias,
  };
}

export default connect(
  mapStateToProps,
  null,
)(CriteriaList);
