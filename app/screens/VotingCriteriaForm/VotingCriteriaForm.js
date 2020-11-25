import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';

import realm from '../../db/schema';
import Color from '../../themes/color';
import { LocalizationContext } from '../../components/Translations';

import ActionButton from '../../components/ActionButton';
import HeaderTitle from '../../components/HeaderTitle';
import CriteriaRatingItem from '../../components/VotingCriteria/CriteriaRatingItem';

import { submitVoting } from '../../services/votingCriteriaService';

class VotingCriteriaForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard_uuid = '931107';

    this.state = {
      scorecard: { uuid: scorecard_uuid },
      criterias: JSON.parse(JSON.stringify(realm.objects('VotingCriteria').filtered(`scorecard_uuid = '${scorecard_uuid}'`))),
      isValid: false,
    };
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

  _submit() {
    submitVoting(this.state.criterias);

    this.props.refreshVotingCriteriaState(this.state.scorecard.uuid);
    this.props.navigation.goBack();
  }

  _renderFooter() {
    const { translations } = this.context;

    return (
      <View style={{padding: 20}}>
        <ActionButton
          onPress={() => this._submit() }
          customBackgroundColor={Color.headerColor}
          isDisabled={!this.state.isValid}
          label={translations.save}/>
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

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    refreshVotingCriteriaState: (scorecard_uuid) => dispatch(getAll(scorecard_uuid)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VotingCriteriaForm);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1
  }
})
