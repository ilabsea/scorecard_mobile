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
    criteria.ratingScore = rating.score;

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

  _submit() {
    let self = this;
    let criterias = this.state.criterias;

    // realm.write(() => {
    //   for(let i=0; i<criterias.length; i++) {
    //     realm.create('Rating', self._buildRatingData(criterias[i]));
    //   }
    // });

    this.props.navigation.goBack();

    // let ratings = realm.objects('Rating').filtered(`scorecard_uuid='${criterias[0].scorecard_uuid}'`);
    // console.log("==========Ratings", JSON.stringify(ratings))
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
