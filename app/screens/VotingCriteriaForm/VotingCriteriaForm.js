import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getAll } from '../../actions/votingCriteriaAction';

import realm from '../../db/schema';
import Color from '../../themes/color';
import { LocalizationContext } from '../../components/Translations';

import ActionButton from '../../components/ActionButton';
import HeaderTitle from '../../components/HeaderTitle';
import CriteriaRatingItem from '../../components/VotingCriteria/CriteriaRatingItem';
import { Icon } from 'native-base';
import { FontFamily } from '../../assets/stylesheets/theme/font';

import { submitVoting } from '../../services/votingCriteriaService';

class VotingCriteriaForm extends Component {
  static contextType = LocalizationContext;

  constructor(props) {
    super(props);
    let scorecard_uuid = props.route.params.scorecard_uuid;

    this.state = {
      scorecard: { uuid: scorecard_uuid },
      participant: { uuid: props.route.params.participant_uuid },
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

  _renderParticipant() {
    const { translations } = this.context;

    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{backgroundColor: '#dfdfdf', marginTop: 10, padding: 10, borderRadius: 8}}>
          <Text>{translations.participant_id}: </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={'person'} style={{fontSize: 28, color: '#8e8e8c'}}/>
            <Text style={{fontSize: 28, fontFamily: FontFamily.title, marginLeft: 10}}>ID: {this.state.participant.uuid}</Text>
          </View>
        </View>
      </View>
    )
  }

  _renderContent() {
    return (
      <ScrollView style={styles.container}>
        <HeaderTitle headline="addNewScorecardVoting" subheading="pleaseFillInformationBelow"/>
        { this._renderParticipant() }
        { this._renderCriteriaRatingList() }
      </ScrollView>
    )
  }

  _submit() {
    const { participant } = this.state;

    submitVoting(this.state.criterias, participant.uuid);

    realm.write(() => {
      realm.create('Participant', {uuid: participant.uuid, voted: true}, 'modified');
    });

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
