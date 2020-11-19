import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text
} from 'react-native';

import { LocalizationContext } from '../../components/Translations';
import realm from '../../db/schema';
import Color from '../../themes/color';
import uuidv4 from '../../utils/uuidv4';
import { Median } from '../../utils/math';
import ratings from '../../db/jsons/ratings';

import ActionButton from '../../components/ActionButton';
import HeaderTitle from '../../components/HeaderTitle';
import CriteriaRatingItem from '../../components/VotingCriteria/CriteriaRatingItem';

export default class VotingCriteriaForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);

    this.state = {
      criterias: JSON.parse(JSON.stringify(realm.objects('VotingCriteria'))),
      isValid: false,
    };
  }

  componentDidMount() {
    // let votingCriterias = [
    //   { uuid: '1', scorecard_uuid: '931107', tag: 'timing' },
    //   { uuid: '2', scorecard_uuid: '931107', tag: 'behaviour' },
    //   { uuid: '3', scorecard_uuid: '931107', tag: 'pricing' },
    //   { uuid: '4', scorecard_uuid: '931107', tag: 'equipment' },
    //   { uuid: '5', scorecard_uuid: '931107', tag: 'hygiene' },
    // ]

    // realm.write(() => {
    //   for(let i=0; i<votingCriterias.length; i++) {
    //     realm.create('VotingCriteria', votingCriterias[i], 'modified');
    //   }
    // });
  }

  onClickRatingIcon(criteria, rating) {
    criteria.ratingScore = rating.value;

    this._checkValidForm();
  }

  _checkValidForm() {
    let isValid = Object.values(this.state.criterias).every(criteria => !!criteria.ratingScore);

    if(isValid) {
      this.setState({isValid: true});
    }
  }

  _renderCriteriaRatingList() {
    return (
      this.state.criterias.map(criteria => {
        return (
          <CriteriaRatingItem
            key={criteria.uuid}
            criteria={criteria}
            onPress={ (rating) => this.onClickRatingIcon(criteria, rating) }
          />
        )
      })
    )
  }

  _renderContent() {
    return (
      <ScrollView style={styles.container}>
        <HeaderTitle headline="addNewScorecardVoting" subheading="pleaseFillInformationBelow"/>

        { this._renderCriteriaRatingList() }
      </ScrollView>
    )
  }

  _buildRatingData(criteria) {
    return {
      uuid: uuidv4(),
      scorecard_uuid: criteria.scorecard_uuid,
      voting_criteria_uuid: criteria.uuid,
      voting_person_uuid: '',
      score: criteria.ratingScore
    }
  }

  _getCountMethod(criteria) {
    return ratings.filter(rating => rating.value == criteria.ratingScore)[0]['countMethodName'];
  }

  _getMedian(criteria) {
    let arr = [];

    for(let i=0; i<ratings.length; i++) {
      for(let j=0; j<criteria[ratings[i].countMethodName]; j++) {
        arr.push(ratings[i].value);
      }
    }

    return ratings[Median(arr)];
  }

  _updateCriteria = (criteria) => {
    let criteriaObj = realm.objects('VotingCriteria').filtered(`uuid='${criteria.uuid}'`)[0];
    criteriaObj[this._getCountMethod(criteria)] += 1;
    criteriaObj.median = this._getMedian(criteriaObj).value;
  }

  _submit() {
    let self = this;
    let criterias = this.state.criterias;

    realm.write(() => {
      for(let i=0; i<criterias.length; i++) {
        realm.create('Rating', self._buildRatingData(criterias[i]));

        self._updateCriteria(criterias[i]);
      }
    });

    this.props.navigation.goBack();
  }

  _renderFooter() {
    return (
      <View style={{padding: 20}}>
        <ActionButton
          onPress={() => this._submit() }
          customBackgroundColor={Color.headerColor}
          isDisabled={!this.state.isValid}
          label={'SAVE'}/>
      </View>
    )
  }

  render() {
    return (
      <View style={{height: '100%', backgroundColor: '#fff'}}>
        { this._renderContent() }
        { this._renderFooter() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  }
})
